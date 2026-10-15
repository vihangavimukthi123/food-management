import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpenIcon, CalendarDaysIcon, CarrotIcon, FlaskConicalIcon, HistoryIcon, HouseIcon, LogOutIcon, MenuIcon, OrbitIcon, RecycleIcon, SettingsIcon, SproutIcon, UserIcon, XIcon, BoxIcon } from "lucide-react";
import { Logo } from "../Logo";
import { useAccount } from "../../contexts/StoreContext";
export const appLinks = [{
  to: '/app',
  label: 'Dashboard',
  icon: HouseIcon,
  end: true
}, {
  to: '/app/coach',
  label: 'AI Coach',
  icon: SproutIcon
}, {
  to: '/app/plan',
  label: 'My Plan',
  icon: CalendarDaysIcon
}, {
  to: '/app/history',
  label: 'Meal History',
  icon: HistoryIcon
}, {
  to: '/app/recipes',
  label: 'Recipes',
  icon: BookOpenIcon
}, {
  to: '/app/kitchen',
  label: 'My Kitchen',
  icon: CarrotIcon
}, {
  to: '/app/waste',
  label: 'Food Waste',
  icon: RecycleIcon
}, {
  to: '/app/profile',
  label: 'My Profile',
  icon: UserIcon
}];
const secondary = [{
  to: '/app/substitutions',
  label: 'Flavour Lab',
  icon: FlaskConicalIcon
}, {
  to: '/app/novelty',
  label: 'The DailyPlate system',
  icon: OrbitIcon
}, {
  to: '/app/settings',
  label: 'Settings',
  icon: SettingsIcon
}, {
  to: '/faq',
  label: 'Help & FAQ',
  icon: BoxIcon
}];
export function AppNav({
  tone


}: {tone: 'light' | 'dark';}) {
  const {
    data,
    logout
  } = useAccount();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const [sheet, setSheet] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dark = tone === 'dark';
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const close = (e: MouseEvent) => !menuRef.current?.contains(e.target as Node) && setMenu(false);
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setMenu(false);
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', esc);
    };
  }, [menu]);
  const doLogout = () => {
    logout();
    navigate('/');
  };
  const surface = scrolled ? dark ? 'bg-forest/90 backdrop-blur-md' : 'bg-ivory/90 backdrop-blur-md shadow-[0_1px_0_rgba(36,23,15,0.08)]' : 'bg-transparent';
  const text = dark ? 'text-cream' : 'text-cocoa';
  const initials = data.profile.name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  return <header className={`fixed inset-x-0 top-0 z-50 transition-[background-color] duration-300 ${surface} ${text}`}>
      <nav aria-label="App" className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-5 lg:h-[72px] lg:px-8">
        <Link to="/app" aria-label="DailyPlate dashboard" className="shrink-0"><Logo variant="compact" tone={dark ? 'onDark' : 'onLight'} /></Link>
        <ul className="mx-auto hidden items-center gap-1 lg:flex">
          {appLinks.slice(0, 7).map((l) => <li key={l.to}>
              <NavLink to={l.to} end={l.end} className={({
            isActive
          }) => `relative flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.82rem] font-semibold transition-colors duration-150 ${isActive ? dark ? 'bg-cream/10' : 'bg-cocoa/[0.07]' : dark ? 'text-cream/70 hover:text-cream' : 'text-cocoa/65 hover:text-cocoa'}`}>
                <l.icon className="hidden h-4 w-4 xl:block" aria-hidden="true" />
                {l.label}
              </NavLink>
            </li>)}
        </ul>
        <div className="relative ml-auto lg:ml-0" ref={menuRef}>
          <button type="button" onClick={() => setMenu((v) => !v)} aria-haspopup="menu" aria-expanded={menu} className={`hidden items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors duration-150 lg:flex ${dark ? 'hover:bg-cream/10' : 'hover:bg-cocoa/5'}`}>
            {data.profile.avatar ? <img src={data.profile.avatar} alt="" className="h-9 w-9 rounded-full object-cover" /> : <span className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold ${dark ? 'bg-champagne text-forest' : 'bg-terracotta text-cream'}`}>{initials}</span>}
            <span className="text-[0.82rem] font-semibold">My Profile</span>
          </button>
          <AnimatePresence>
            {menu && <motion.div role="menu" initial={{
            opacity: 0,
            y: -6,
            scale: 0.98
          }} animate={{
            opacity: 1,
            y: 0,
            scale: 1
          }} exit={{
            opacity: 0,
            y: -4,
            scale: 0.98
          }} transition={{
            duration: 0.16,
            ease: [0.23, 1, 0.32, 1]
          }} className="absolute right-0 top-12 w-64 origin-top-right overflow-hidden rounded-xl bg-ivory py-2 text-cocoa shadow-2xl ring-1 ring-cocoa/10">
                <div className="border-b border-cocoa/10 px-4 pb-3 pt-1">
                  <p className="font-display text-xl">{data.profile.name}</p>
                  <p className="text-xs text-cocoa/60">Your food identity</p>
                </div>
                {[{
              to: '/app/profile',
              label: 'My Profile',
              icon: UserIcon
            }, ...secondary].map((l) => <Link key={l.to} role="menuitem" to={l.to} onClick={() => setMenu(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm transition-colors duration-150 hover:bg-cocoa/5">
                    <l.icon className="h-4 w-4 text-cocoa/60" aria-hidden="true" />{l.label}
                  </Link>)}
                <button role="menuitem" type="button" onClick={doLogout} className="flex w-full items-center gap-3 border-t border-cocoa/10 px-4 py-2.5 text-left text-sm text-burnt transition-colors duration-150 hover:bg-cocoa/5">
                  <LogOutIcon className="h-4 w-4" aria-hidden="true" />Log out
                </button>
              </motion.div>}
          </AnimatePresence>
        </div>
        <button type="button" className="ml-auto rounded-full p-2 lg:hidden" onClick={() => setSheet(true)} aria-label="Open navigation">
          <MenuIcon className="h-6 w-6" />
        </button>
      </nav>

      <AnimatePresence>
        {sheet && <motion.div className="fixed inset-0 z-[70] overflow-y-auto bg-forest px-6 pb-10 pt-5 text-cream lg:hidden" initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} transition={{
        duration: 0.2
      }}>
            <div className="flex items-center justify-between">
              <Logo variant="compact" tone="onDark" />
              <button type="button" onClick={() => setSheet(false)} aria-label="Close navigation" className="rounded-full p-2"><XIcon className="h-6 w-6" /></button>
            </div>
            <ul className="mt-10 space-y-1">
              {appLinks.map((l, i) => <motion.li key={l.to} initial={{
            opacity: 0,
            x: -8
          }} animate={{
            opacity: 1,
            x: 0
          }} transition={{
            delay: i * 0.035,
            duration: 0.2
          }}>
                  <NavLink to={l.to} end={l.end} onClick={() => setSheet(false)} className={({
              isActive
            }) => `flex items-center gap-4 py-3 font-display text-3xl ${isActive ? 'text-champagne' : 'text-cream'}`}>
                    <l.icon className="h-5 w-5 opacity-70" aria-hidden="true" />{l.label}
                  </NavLink>
                </motion.li>)}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-2 border-t border-cream/15 pt-6">
              {secondary.map((l) => <Link key={l.to} to={l.to} onClick={() => setSheet(false)} className="flex items-center gap-2 py-2 text-sm text-cream/80"><l.icon className="h-4 w-4" aria-hidden="true" />{l.label}</Link>)}
              <button type="button" onClick={doLogout} className="flex items-center gap-2 py-2 text-left text-sm text-champagne"><LogOutIcon className="h-4 w-4" aria-hidden="true" />Log out</button>
            </div>
          </motion.div>}
      </AnimatePresence>
    </header>;
}