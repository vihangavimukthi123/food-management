import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { UserData } from '../types/store';
import { ActivityKind, StoredUser } from '../types/user';
import { createUserData } from '../utils/seed';
import { uid } from '../utils/dates';

const USERS_KEY = 'dp.users';
const SESSION_KEY = 'dp.session';
const dataKey = (email: string) => `dp.data.${email.toLowerCase()}`;

export const DEMO_ACCOUNT = { name: 'Vihanga', email: 'demo@dailyplate.app', password: 'plate1234' };

interface StoreValue {
  user: StoredUser | null;
  data: UserData | null;
  register: (name: string, email: string, password: string) => string | null;
  login: (email: string, password: string, remember: boolean) => string | null;
  logout: () => void;
  requestReset: (email: string) => {code?: string;error?: string;};
  resetPassword: (email: string, code: string, password: string) => string | null;
  update: (fn: (d: UserData) => UserData) => void;
  logActivity: (text: string, kind: ActivityKind) => void;
  renameUser: (name: string) => void;
  resetDemo: () => void;
  deleteAccount: () => void;
}

const StoreContext = createContext<StoreValue | null>(null);

function readJSON<T>(storage: Storage, key: string, fallback: T): T {
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) as T : fallback;
  } catch {
    return fallback;
  }
}

function loadUsers(): StoredUser[] {
  const existing = readJSON<StoredUser[] | null>(localStorage, USERS_KEY, null);
  if (existing && existing.length) return existing;
  const seeded = [{ ...DEMO_ACCOUNT, createdAt: new Date().toISOString() }];
  localStorage.setItem(USERS_KEY, JSON.stringify(seeded));
  return seeded;
}

function loadData(user: StoredUser): UserData {
  const fresh = createUserData(user.name, user.email === DEMO_ACCOUNT.email);
  const stored = readJSON<UserData | null>(localStorage, dataKey(user.email), null);
  if (stored) {
    if (!stored.history || !stored.history.length) stored.history = fresh.history;
    if (!stored.profile.equipment) stored.profile.equipment = fresh.profile.equipment;
    if (!stored.profile.schedule) stored.profile.schedule = fresh.profile.schedule;
    if (!stored.profile.budget) stored.profile.budget = fresh.profile.budget;
    return stored;
  }
  localStorage.setItem(dataKey(user.email), JSON.stringify(fresh));
  return fresh;
}

function initial() {
  const users = loadUsers();
  const email = localStorage.getItem(SESSION_KEY) || sessionStorage.getItem(SESSION_KEY);
  const user = users.find((u) => u.email === email) ?? null;
  return { users, email: user ? user.email : null, data: user ? loadData(user) : null };
}

export function StoreProvider({ children }: {children: React.ReactNode;}) {
  const [init] = useState(initial);
  const [users, setUsers] = useState<StoredUser[]>(init.users);
  const [email, setEmail] = useState<string | null>(init.email);
  const [data, setData] = useState<UserData | null>(init.data);

  const user = useMemo(() => users.find((u) => u.email === email) ?? null, [users, email]);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (email && data) localStorage.setItem(dataKey(email), JSON.stringify(data));
  }, [email, data]);

  useEffect(() => {
    document.documentElement.classList.toggle('dp-large-text', Boolean(data?.settings.largeText));
  }, [data?.settings.largeText]);

  const startSession = useCallback((u: StoredUser, remember: boolean) => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    (remember ? localStorage : sessionStorage).setItem(SESSION_KEY, u.email);
    sessionStorage.removeItem('dp.welcomed');
    setEmail(u.email);
    setData(loadData(u));
  }, []);

  const register = useCallback((name: string, mail: string, password: string) => {
    const e = mail.trim().toLowerCase();
    if (users.some((u) => u.email === e)) return 'An account with this email already exists.';
    const u: StoredUser = { name: name.trim(), email: e, password, createdAt: new Date().toISOString() };
    localStorage.removeItem(dataKey(e));
    setUsers((prev) => [...prev, u]);
    startSession(u, true);
    return null;
  }, [users, startSession]);

  const login = useCallback((mail: string, password: string, remember: boolean) => {
    const u = users.find((x) => x.email === mail.trim().toLowerCase());
    if (!u || u.password !== password) return 'That email and password combination doesn’t match our records.';
    startSession(u, remember);
    return null;
  }, [users, startSession]);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setEmail(null);
    setData(null);
  }, []);

  const requestReset = useCallback((mail: string) => {
    const e = mail.trim().toLowerCase();
    if (!users.some((u) => u.email === e)) return { error: 'We couldn’t find an account with that email.' };
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setUsers((prev) => prev.map((u) => u.email === e ? { ...u, resetCode: code } : u));
    return { code };
  }, [users]);

  const resetPassword = useCallback((mail: string, code: string, password: string) => {
    const e = mail.trim().toLowerCase();
    const u = users.find((x) => x.email === e);
    if (!u) return 'We couldn’t find an account with that email.';
    if (!u.resetCode || u.resetCode !== code.trim()) return 'That reset code isn’t right. Check the code and try again.';
    setUsers((prev) => prev.map((x) => x.email === e ? { ...x, password, resetCode: undefined } : x));
    return null;
  }, [users]);

  const update = useCallback((fn: (d: UserData) => UserData) => {
    setData((d) => d ? fn(d) : d);
  }, []);

  const logActivity = useCallback((text: string, kind: ActivityKind) => {
    setData((d) => d ? { ...d, activity: [{ id: uid(), text, kind, at: new Date().toISOString() }, ...d.activity].slice(0, 30) } : d);
  }, []);

  const renameUser = useCallback((name: string) => {
    setUsers((prev) => prev.map((u) => u.email === email ? { ...u, name } : u));
  }, [email]);

  const resetDemo = useCallback(() => {
    if (!user) return;
    setData(createUserData(user.name, user.email === DEMO_ACCOUNT.email));
  }, [user]);

  const deleteAccount = useCallback(() => {
    if (!email) return;
    localStorage.removeItem(dataKey(email));
    setUsers((prev) => {
      const next = prev.filter((u) => u.email !== email);
      return next.length ? next : [{ ...DEMO_ACCOUNT, createdAt: new Date().toISOString() }];
    });
    logout();
  }, [email, logout]);

  const value = useMemo<StoreValue>(
    () => ({ user, data, register, login, logout, requestReset, resetPassword, update, logActivity, renameUser, resetDemo, deleteAccount }),
    [user, data, register, login, logout, requestReset, resetPassword, update, logActivity, renameUser, resetDemo, deleteAccount]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

/** For authenticated screens — RequireAuth guarantees data exists. */
export function useAccount() {
  const store = useStore();
  if (!store.data || !store.user) throw new Error('No active account');
  return { ...store, data: store.data, user: store.user };
}