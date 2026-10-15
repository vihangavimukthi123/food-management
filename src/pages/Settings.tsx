import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { DownloadIcon, RotateCcwIcon, Trash2Icon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { allergenOptions, dietOptions } from '../data/options';
import { Chip } from '../components/Chip';
import { Toggle } from '../components/Toggle';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { PrototypeNotice } from '../components/PrototypeNotice';
import { Settings as SettingsType } from '../types/user';
import { buttonClass } from '../utils/styles';

const sections = [
{ id: 'account', label: 'Profile settings' },
{ id: 'diet', label: 'Dietary preferences' },
{ id: 'notifications', label: 'Notifications' },
{ id: 'appearance', label: 'Appearance' },
{ id: 'data', label: 'Data management' }];


export function Settings() {
  const { data, user, update, resetDemo, deleteAccount } = useAccount();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState<'reset' | 'delete' | null>(null);
  const s = data.settings;
  const p = data.profile;

  const setSetting = <K extends keyof SettingsType,>(k: K, v: SettingsType[K]) => {
    update((d) => ({ ...d, settings: { ...d.settings, [k]: v } }));
    toast.success('Preference saved');
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ account: { name: user.name, email: user.email }, ...data }, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dailyplate-data.json';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('Your data was downloaded');
  };

  return (
    <div className="grain min-h-screen bg-[#ebe6d3] text-cocoa">
      <div className="mx-auto grid max-w-[1200px] gap-12 px-5 pb-24 pt-24 lg:grid-cols-[220px_1fr] lg:px-8 lg:pt-28">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h1 className="font-display text-5xl">Settings</h1>
          <nav aria-label="Settings sections" className="mt-8 hidden lg:block">
            <ul className="space-y-1">{sections.map((x) => <li key={x.id}><a href={`#${x.id}`} className="block py-1.5 text-sm text-cocoa/70 hover:text-cocoa">{x.label}</a></li>)}</ul>
          </nav>
        </aside>

        <div className="divide-y divide-cocoa/15">
          <section id="account" aria-labelledby="h-account" className="scroll-mt-28 pb-10">
            <h2 id="h-account" className="font-display text-3xl">Profile settings</h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <div><dt className="text-xs text-cocoa/55">Name</dt><dd className="mt-1 font-semibold">{p.name}</dd></div>
              <div><dt className="text-xs text-cocoa/55">Email</dt><dd className="mt-1 font-semibold">{user.email}</dd></div>
            </dl>
            <Link to="/app/profile" className={`${buttonClass('secondary')} mt-6`}>Edit your food identity</Link>
          </section>

          <section id="diet" aria-labelledby="h-diet" className="scroll-mt-28 py-10">
            <h2 id="h-diet" className="font-display text-3xl">Dietary preferences</h2>
            <p className="mt-2 text-sm text-cocoa/60">Changes apply instantly across your coach, plan, recipes and leftovers.</p>
            <h3 className="mt-6 text-sm font-semibold">Dietary restrictions</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {dietOptions.map((d) =>
              <Chip key={d.id} selected={p.restrictions.includes(d.id)} onClick={() => update((x) => ({ ...x, profile: { ...x.profile, restrictions: x.profile.restrictions.includes(d.id) ? x.profile.restrictions.filter((r) => r !== d.id) : [...x.profile.restrictions, d.id] } }))}>{d.label}</Chip>
              )}
            </div>
            <h3 className="mt-6 text-sm font-semibold">Allergies</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {allergenOptions.map((a) =>
              <Chip key={a.id} selected={p.allergies.includes(a.id)} onClick={() => update((x) => ({ ...x, profile: { ...x.profile, allergies: x.profile.allergies.includes(a.id) ? x.profile.allergies.filter((r) => r !== a.id) : [...x.profile.allergies, a.id] } }))}>{a.label}</Chip>
              )}
            </div>
          </section>

          <section id="notifications" aria-labelledby="h-notif" className="scroll-mt-28 py-10">
            <h2 id="h-notif" className="font-display text-3xl">Notifications</h2>
            <p className="mt-2 text-sm text-cocoa/60">Saved to your account. In this prototype, no messages are actually sent.</p>
            <div className="mt-4 divide-y divide-cocoa/10">
              <Toggle id="n-meal" label="Meal reminders" description="A gentle nudge for meals in My Plan." checked={s.mealReminders} onChange={(v) => setSetting('mealReminders', v)} />
              <Toggle id="n-exp" label="Expiry alerts" description="When kitchen ingredients are close to expiring." checked={s.expiryAlerts} onChange={(v) => setSetting('expiryAlerts', v)} />
              <Toggle id="n-week" label="Weekly summary" description="Your week of meals and rescued ingredients." checked={s.weeklySummary} onChange={(v) => setSetting('weeklySummary', v)} />
              <Toggle id="n-coach" label="Coach tips" description="Occasional suggestions from your coach." checked={s.coachTips} onChange={(v) => setSetting('coachTips', v)} />
            </div>
          </section>

          <section id="appearance" aria-labelledby="h-app" className="scroll-mt-28 py-10">
            <h2 id="h-app" className="font-display text-3xl">Appearance</h2>
            <div className="mt-4 divide-y divide-cocoa/10">
              <Toggle id="a-motion" label="Reduce motion" description="Minimise transitions and animation everywhere." checked={s.reduceMotion} onChange={(v) => setSetting('reduceMotion', v)} />
              <Toggle id="a-ambient" label="Living backgrounds" description="Drifting leaves, steam and spice particles." checked={s.ambientMotion} onChange={(v) => setSetting('ambientMotion', v)} />
              <Toggle id="a-text" label="Larger text" description="Increase the size of all text." checked={s.largeText} onChange={(v) => setSetting('largeText', v)} />
            </div>
          </section>

          <section id="data" aria-labelledby="h-data" className="scroll-mt-28 py-10">
            <h2 id="h-data" className="font-display text-3xl">Data management</h2>
            <p className="mt-2 text-sm text-cocoa/60">Everything is stored in this browser’s localStorage.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={exportData} className={buttonClass('secondary')}><DownloadIcon className="h-4 w-4" />Export my data</button>
              <button type="button" onClick={() => setConfirm('reset')} className={buttonClass('secondary')}><RotateCcwIcon className="h-4 w-4" />Reset demo data</button>
              <button type="button" onClick={() => setConfirm('delete')} className={`${buttonClass('secondary')} border-burnt/40 text-burnt hover:border-burnt`}><Trash2Icon className="h-4 w-4" />Delete account</button>
            </div>
            <PrototypeNotice className="mt-8" />
          </section>
        </div>
      </div>

      <ConfirmDialog open={confirm === 'reset'} title="Reset demo data?" message="Your profile, kitchen, waste journal, plan, saved recipes and coach conversation will return to the demonstration defaults." confirmLabel="Reset" onConfirm={() => {resetDemo();toast.success('Demo data restored');}} onClose={() => setConfirm(null)} />
      <ConfirmDialog open={confirm === 'delete'} title="Delete your account?" message="This removes your account and all its data from this browser. It can’t be undone." confirmLabel="Delete account" onConfirm={() => {deleteAccount();navigate('/');}} onClose={() => setConfirm(null)} />
    </div>);

}