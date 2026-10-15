import React, { useEffect, useState } from 'react';
import { ImagePlusIcon, XIcon } from 'lucide-react';
import { Modal } from '../Modal';
import { pantryCategories, unitOptions } from '../../data/options';
import { PantryCategory, PantryItem } from '../../types/kitchen';
import { guessCategory } from '../../utils/kitchen';
import { isoDaysFromNow } from '../../utils/dates';
import { buttonClass, inputClass } from '../../utils/styles';

interface Props {
  open: boolean;
  item: PantryItem | null;
  onClose: () => void;
  onSave: (v: Omit<PantryItem, 'id' | 'added'>) => void;
}

const empty = { name: '', category: 'Vegetables' as PantryCategory, quantity: '1', unit: 'whole', expiry: isoDaysFromNow(7), photo: '', lowAt: '1' };

export function IngredientForm({ open, item, onClose, onSave }: Props) {
  const [v, setV] = useState(empty);
  const [touchedCat, setTouchedCat] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!open) return;
    setErrors({});
    setTouchedCat(Boolean(item));
    setV(item ? { name: item.name, category: item.category, quantity: String(item.quantity), unit: item.unit, expiry: item.expiry, photo: item.photo ?? '', lowAt: String(item.lowAt) } : { ...empty, expiry: isoDaysFromNow(7) });
  }, [open, item]);

  const set = (k: keyof typeof empty, val: string) => setV((p) => ({ ...p, [k]: val }));

  const onPhoto = (file?: File) => {
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) return setErrors((e) => ({ ...e, photo: 'Choose an image under 1.5 MB.' }));
    const reader = new FileReader();
    reader.onload = () => set('photo', String(reader.result));
    reader.readAsDataURL(file);
    return undefined;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!v.name.trim()) next.name = 'Give the ingredient a name.';
    const q = Number(v.quantity);
    if (!Number.isFinite(q) || q < 0) next.quantity = 'Enter a quantity of 0 or more.';
    if (!v.expiry) next.expiry = 'Choose an expiry date.';
    setErrors(next);
    if (Object.keys(next).length) return;
    onSave({ name: v.name.trim(), category: v.category, quantity: q, unit: v.unit, expiry: v.expiry, photo: v.photo || undefined, lowAt: Math.max(0, Number(v.lowAt) || 0) });
  };

  return (
    <Modal open={open} onClose={onClose} title={item ? `Edit ${item.name}` : 'Add an ingredient'}>
      <form onSubmit={submit} noValidate className="space-y-5">
        <div>
          <label htmlFor="ing-name" className="mb-2 block text-sm font-semibold">Name</label>
          <input id="ing-name" value={v.name} onChange={(e) => {set('name', e.target.value);if (!touchedCat) set('category', guessCategory(e.target.value));}} className={inputClass()} placeholder="e.g. Curry leaves" aria-invalid={Boolean(errors.name)} />
          {errors.name && <p className="mt-1 text-xs text-burnt">{errors.name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="ing-cat" className="mb-2 block text-sm font-semibold">Category</label>
            <select id="ing-cat" value={v.category} onChange={(e) => {setTouchedCat(true);set('category', e.target.value);}} className={inputClass()}>
              {pantryCategories.map((c) => <option key={c.id} value={c.id}>{c.id}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="ing-exp" className="mb-2 block text-sm font-semibold">Expiry date</label>
            <input id="ing-exp" type="date" value={v.expiry} onChange={(e) => set('expiry', e.target.value)} className={inputClass()} aria-invalid={Boolean(errors.expiry)} />
            {errors.expiry && <p className="mt-1 text-xs text-burnt">{errors.expiry}</p>}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="ing-qty" className="mb-2 block text-sm font-semibold">Quantity</label>
            <input id="ing-qty" type="number" min={0} step="any" value={v.quantity} onChange={(e) => set('quantity', e.target.value)} className={inputClass()} aria-invalid={Boolean(errors.quantity)} />
          </div>
          <div>
            <label htmlFor="ing-unit" className="mb-2 block text-sm font-semibold">Unit</label>
            <select id="ing-unit" value={v.unit} onChange={(e) => set('unit', e.target.value)} className={inputClass()}>
              {unitOptions.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="ing-low" className="mb-2 block text-sm font-semibold">Low at</label>
            <input id="ing-low" type="number" min={0} step="any" value={v.lowAt} onChange={(e) => set('lowAt', e.target.value)} className={inputClass()} />
          </div>
        </div>
        {errors.quantity && <p className="-mt-3 text-xs text-burnt">{errors.quantity}</p>}
        <div>
          <span className="mb-2 block text-sm font-semibold">Photo (optional)</span>
          {v.photo ?
          <div className="flex items-center gap-4">
              <img src={v.photo} alt="Selected ingredient" className="h-20 w-20 object-cover" />
              <button type="button" onClick={() => set('photo', '')} className="inline-flex items-center gap-1 text-sm text-burnt"><XIcon className="h-4 w-4" />Remove</button>
            </div> :

          <label className="flex cursor-pointer items-center gap-3 border border-dashed border-cocoa/25 px-4 py-4 text-sm text-cocoa/65 hover:border-cocoa/50">
              <ImagePlusIcon className="h-5 w-5" />Choose a photo from this device
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => onPhoto(e.target.files?.[0])} />
            </label>
          }
          {errors.photo && <p className="mt-1 text-xs text-burnt">{errors.photo}</p>}
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="button" onClick={onClose} className={buttonClass('secondary')}>Cancel</button>
          <button type="submit" className={buttonClass('primary')}>{item ? 'Save changes' : 'Add to kitchen'}</button>
        </div>
      </form>
    </Modal>);

}