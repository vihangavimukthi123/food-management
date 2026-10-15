import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
import { Chip } from './Chip';

interface TagInputProps {
  id: string;
  label: string;
  values: string[];
  onChange: (v: string[]) => void;
  suggestions: string[];
  tone?: 'light' | 'dark';
  placeholder?: string;
}

export function TagInput({ id, label, values, onChange, suggestions, tone = 'light', placeholder = 'Add your own' }: TagInputProps) {
  const [draft, setDraft] = useState('');
  const toggle = (v: string) => onChange(values.includes(v) ? values.filter((x) => x !== v) : [...values, v]);
  const add = () => {
    const v = draft.trim();
    if (v && !values.some((x) => x.toLowerCase() === v.toLowerCase())) onChange([...values, v]);
    setDraft('');
  };
  const custom = values.filter((v) => !suggestions.includes(v));
  const dark = tone === 'dark';
  return (
    <fieldset>
      <legend className={`mb-3 text-sm font-semibold ${dark ? 'text-cream' : 'text-cocoa'}`}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => <Chip key={s} tone={tone} selected={values.includes(s)} onClick={() => toggle(s)}>{s}</Chip>)}
        {custom.map((s) =>
        <span key={s} className={`inline-flex items-center gap-1 rounded-full py-2 pl-4 pr-2 text-sm font-medium ${dark ? 'bg-champagne text-forest' : 'bg-cocoa text-cream'}`}>
            {s}
            <button type="button" onClick={() => toggle(s)} aria-label={`Remove ${s}`} className="rounded-full p-0.5 hover:opacity-70"><XIcon className="h-3.5 w-3.5" /></button>
          </span>
        )}
      </div>
      <div className={`mt-3 flex max-w-sm items-center gap-2 border-b pb-1 ${dark ? 'border-cream/25' : 'border-cocoa/20'}`}>
        <label htmlFor={id} className="sr-only">{`Add to ${label}`}</label>
        <input
          id={id}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {if (e.key === 'Enter') {e.preventDefault();add();}}}
          placeholder={placeholder}
          className={`flex-1 bg-transparent py-1.5 text-sm focus:outline-none ${dark ? 'text-cream placeholder:text-cream/40' : 'text-cocoa placeholder:text-cocoa/40'}`} />
        
        <button type="button" onClick={add} disabled={!draft.trim()} aria-label="Add" className="rounded-full p-1 disabled:opacity-30"><PlusIcon className="h-4 w-4" /></button>
      </div>
    </fieldset>);

}