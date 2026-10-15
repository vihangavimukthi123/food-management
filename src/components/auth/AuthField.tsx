import React, { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { inputClass } from '../../utils/styles';

interface AuthFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
  hint?: string;
}

export function AuthField({ id, label, value, onChange, type = 'text', error, autoComplete, placeholder, hint }: AuthFieldProps) {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-cocoa">{label}</label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && show ? 'text' : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
          className={`${inputClass('light')} ${isPassword ? 'pr-12' : ''} ${error ? 'border-burnt' : ''}`} />
        
        {isPassword &&
        <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-cocoa/50 hover:text-cocoa">
            {show ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
          </button>
        }
      </div>
      {error ?
      <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-burnt">{error}</p> :
      hint ?
      <p id={`${id}-hint`} className="mt-1.5 text-xs text-cocoa/50">{hint}</p> :
      null}
    </div>);

}