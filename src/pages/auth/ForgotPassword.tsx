import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, KeyRoundIcon } from 'lucide-react';
import { AuthShell } from '../../components/auth/AuthShell';
import { AuthField } from '../../components/auth/AuthField';
import { useStore } from '../../contexts/StoreContext';
import { buttonClass } from '../../utils/styles';
import { validEmail } from '../../utils/validation';

export function ForgotPassword() {
  const { requestReset } = useStore();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>();
  const [code, setCode] = useState<string>();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validEmail(email)) return setError('Enter a valid email address.');
    const res = requestReset(email);
    if (res.error) return setError(res.error);
    setError(undefined);
    setCode(res.code);
    return undefined;
  };

  return (
    <AuthShell title={<>Forgotten your <span className="italic text-terracotta">password?</span></>} subtitle="It happens. We’ll help you set a new one." quote="“The kitchen is always open. Let’s get you back inside.”">
      {code ?
      <div role="status">
          <div className="border border-cocoa/15 bg-ivory p-6">
            <div className="flex items-center gap-3 text-botanical"><KeyRoundIcon className="h-5 w-5" /><p className="font-semibold">Demonstration reset code</p></div>
            <p className="mt-4 text-sm text-cocoa/70">In a real product this would arrive by email. For this prototype, here is your one-time code:</p>
            <p className="mt-4 font-display text-5xl tracking-[0.2em] text-cocoa">{code}</p>
          </div>
          <Link to={`/reset-password?email=${encodeURIComponent(email.trim().toLowerCase())}`} className={`${buttonClass('primary')} mt-6 w-full py-4`}>Continue to reset <ArrowRightIcon className="h-4 w-4" /></Link>
        </div> :

      <form onSubmit={submit} noValidate className="space-y-5">
          <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} error={error} autoComplete="email" placeholder="you@example.com" />
          <button type="submit" className={`${buttonClass('primary')} w-full py-4`}>Send reset code</button>
        </form>
      }
      <p className="mt-8 border-t border-cocoa/10 pt-6 text-sm text-cocoa/70">Remembered it? <Link to="/login" className="font-semibold text-cocoa hover:underline">Back to sign in</Link></p>
    </AuthShell>);

}