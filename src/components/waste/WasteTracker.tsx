import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { PencilIcon, Trash2Icon } from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { unitOptions, wasteReasons } from '../../data/options';
import { WasteEntry, WasteReason } from '../../types/kitchen';
import { daysUntil, formatDay, isoDaysFromNow, uid } from '../../utils/dates';
import { buttonClass, inputClass } from '../../utils/styles';
import { ConfirmDialog } from '../ConfirmDialog';

const blank = { item: '', quantity: '1', unit: 'whole', date: isoDaysFromNow(0), reason: 'Expired' as WasteReason, note: '' };

export function WasteTracker() {
  const { data, update, logActivity } = useAccount();
  const [form, setForm] = useState(blank);
  const [editId, setEditId] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [reason, setReason] = useState('');
  const [period, setPeriod] = useState('30');
  const [deleting, setDeleting] = useState<WasteEntry | null>(null);

  const history = useMemo(() => [...data.waste].
  filter((w) => reason ? w.reason === reason : true).
  filter((w) => period === 'all' ? true : daysUntil(w.date) >= -Number(period)).
  sort((a, b) => b.date.localeCompare(a.date)), [data.waste, reason, period]);

  const reasonTop = Object.entries(history.reduce<Record<string, number>>((a, w) => ({ ...a, [w.reason]: (a[w.reason] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1])[0];
  const itemTop = Object.entries(history.reduce<Record<string, number>>((a, w) => ({ ...a, [w.item]: (a[w.item] ?? 0) + 1 }), {})).sort((a, b) => b[1] - a[1])[0];

  const set = (k: keyof typeof blank, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.item.trim()) next.item = 'What was wasted?';
    const q = Number(form.quantity);
    if (!Number.isFinite(q) || q <= 0) next.quantity = 'Enter a quantity above 0.';
    if (!form.date) next.date = 'Choose a date.';else
    if (daysUntil(form.date) > 0) next.date = 'The date can’t be in the future.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const entry = { item: form.item.trim(), quantity: q, unit: form.unit, date: form.date, reason: form.reason, note: form.note.trim() };
    if (editId) {
      update((d) => ({ ...d, waste: d.waste.map((w) => w.id === editId ? { ...w, ...entry } : w) }));
      toast.success('Entry updated');
    } else {
      update((d) => ({ ...d, waste: [{ id: uid(), ...entry }, ...d.waste] }));
      logActivity(`Logged ${entry.item.toLowerCase()} in Food Rescue`, 'waste');
      toast.success('Logged — thank you for noticing', { description: 'Patterns appear below as you add more.' });
    }
    setForm({ ...blank, date: isoDaysFromNow(0) });
    setEditId(null);
  };

  const startEdit = (w: WasteEntry) => {
    setEditId(w.id);
    setForm({ item: w.item, quantity: String(w.quantity), unit: w.unit, date: w.date, reason: w.reason, note: w.note });
    document.getElementById('waste-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section aria-labelledby="tracker" className="kraft">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 lg:grid-cols-[380px_1fr] lg:px-8 lg:py-28">
        <form id="waste-form" onSubmit={submit} noValidate className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 id="tracker" className="font-display text-4xl">{editId ? 'Edit entry' : 'Log what was wasted'}</h2>
          <p className="text-sm text-cocoa/65">Honest, private and only for you — noticing is the first step.</p>
          <div>
            <label htmlFor="w-item" className="mb-1.5 block text-sm font-semibold">Ingredient or food</label>
            <input id="w-item" value={form.item} onChange={(e) => set('item', e.target.value)} className={inputClass()} placeholder="e.g. Cooked rice" aria-invalid={Boolean(errors.item)} />
            {errors.item && <p className="mt-1 text-xs text-burnt">{errors.item}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="w-qty" className="mb-1.5 block text-sm font-semibold">Quantity</label>
              <input id="w-qty" type="number" min={0} step="any" value={form.quantity} onChange={(e) => set('quantity', e.target.value)} className={inputClass()} aria-invalid={Boolean(errors.quantity)} />
            </div>
            <div>
              <label htmlFor="w-unit" className="mb-1.5 block text-sm font-semibold">Unit</label>
              <select id="w-unit" value={form.unit} onChange={(e) => set('unit', e.target.value)} className={inputClass()}>{unitOptions.map((u) => <option key={u}>{u}</option>)}</select>
            </div>
          </div>
          {errors.quantity && <p className="-mt-2 text-xs text-burnt">{errors.quantity}</p>}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="w-date" className="mb-1.5 block text-sm font-semibold">Date</label>
              <input id="w-date" type="date" value={form.date} max={isoDaysFromNow(0)} onChange={(e) => set('date', e.target.value)} className={inputClass()} aria-invalid={Boolean(errors.date)} />
            </div>
            <div>
              <label htmlFor="w-reason" className="mb-1.5 block text-sm font-semibold">Reason</label>
              <select id="w-reason" value={form.reason} onChange={(e) => set('reason', e.target.value)} className={inputClass()}>{wasteReasons.map((r) => <option key={r}>{r}</option>)}</select>
            </div>
          </div>
          {errors.date && <p className="-mt-2 text-xs text-burnt">{errors.date}</p>}
          <div>
            <label htmlFor="w-note" className="mb-1.5 block text-sm font-semibold">Note <span className="font-normal text-cocoa/50">(optional)</span></label>
            <textarea id="w-note" rows={2} value={form.note} onChange={(e) => set('note', e.target.value)} className={inputClass()} />
          </div>
          <div className="flex gap-3 pt-1">
            <button type="submit" className={buttonClass('primary')}>{editId ? 'Save changes' : 'Add entry'}</button>
            {editId && <button type="button" onClick={() => {setEditId(null);setForm(blank);setErrors({});}} className={buttonClass('secondary')}>Cancel</button>}
          </div>
        </form>

        <div>
          <div className="flex flex-col gap-4 border-b border-cocoa/20 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-4xl">Your rescue journal</h2>
            <div className="flex gap-4">
              <label className="sr-only" htmlFor="w-filter-reason">Filter by reason</label>
              <select id="w-filter-reason" value={reason} onChange={(e) => setReason(e.target.value)} className="border-b border-cocoa/25 bg-transparent py-1.5 text-sm focus:outline-none">
                <option value="">All reasons</option>{wasteReasons.map((r) => <option key={r}>{r}</option>)}
              </select>
              <label className="sr-only" htmlFor="w-filter-period">Filter by period</label>
              <select id="w-filter-period" value={period} onChange={(e) => setPeriod(e.target.value)} className="border-b border-cocoa/25 bg-transparent py-1.5 text-sm focus:outline-none">
                <option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="all">All time</option>
              </select>
            </div>
          </div>
          <p className="mt-6 max-w-2xl font-display text-2xl leading-snug">
            {history.length ?
            <>{history.length} {history.length === 1 ? 'entry' : 'entries'} in this view. Most often <span className="italic text-terracotta">{reasonTop?.[0].toLowerCase()}</span>{itemTop && itemTop[1] > 1 ? <>, and <span className="italic text-terracotta">{itemTop[0].toLowerCase()}</span> appears {itemTop[1]} times</> : ''}.</> :
            'No entries in this view.'}
          </p>
          <p className="mt-1 text-xs text-cocoa/50">Summaries are based only on your own entries.</p>

          {history.length > 0 &&
          <ul className="mt-8 divide-y divide-cocoa/15 border-y border-cocoa/15">
              <AnimatePresence initial={false}>
                {history.map((w) =>
              <motion.li key={w.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className="grid grid-cols-[80px_1fr_auto] items-start gap-4 py-4">
                    <span className="text-xs text-cocoa/55">{formatDay(w.date, 'd MMM')}</span>
                    <div>
                      <p className="font-display text-xl">{w.item} <span className="font-sans text-sm text-cocoa/55">· {w.quantity} {w.unit}</span></p>
                      <p className="text-xs text-terracotta">{w.reason}</p>
                      {w.note && <p className="mt-1 text-sm text-cocoa/65">{w.note}</p>}
                    </div>
                    <div className="flex gap-1">
                      <button type="button" onClick={() => startEdit(w)} aria-label={`Edit ${w.item}`} className="rounded-full p-2 text-cocoa/55 hover:bg-cocoa/5 hover:text-cocoa"><PencilIcon className="h-4 w-4" /></button>
                      <button type="button" onClick={() => setDeleting(w)} aria-label={`Delete ${w.item}`} className="rounded-full p-2 text-cocoa/55 hover:bg-cocoa/5 hover:text-burnt"><Trash2Icon className="h-4 w-4" /></button>
                    </div>
                  </motion.li>
              )}
              </AnimatePresence>
            </ul>
          }
        </div>
      </div>
      <ConfirmDialog open={Boolean(deleting)} title="Delete this entry?" message={`${deleting?.item ?? ''} will be removed from your rescue journal.`} onConfirm={() => deleting && update((d) => ({ ...d, waste: d.waste.filter((w) => w.id !== deleting.id) }))} onClose={() => setDeleting(null)} />
    </section>);

}