import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { AuthShell } from '../../components/auth/AuthShell';
import { AuthField } from '../../components/auth/AuthField';
import { DEMO_ACCOUNT, useStore } from '../../contexts/StoreContext';
import { buttonClass } from '../../utils/styles';
import { validEmail } from '../../utils/validation';

export function Login() {
  const { login } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as {from?: string;notice?: string;} | null)?.from ?? '/app';
  const notice = (location.state as {notice?: string;} | null)?.notice;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{email?: string;password?: string;form?: string;}>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!validEmail(email)) next.email = 'Enter a valid email address.';
    if (!password) next.password = 'Enter your password.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      const err = login(email, password, remember);
      setLoading(false);
      if (err) setErrors({ form: err });else
      navigate(from, { replace: true });
    }, 250);
  };

  const useDemo = () => {
    setEmail(DEMO_ACCOUNT.email);
    setPassword(DEMO_ACCOUNT.password);
    setErrors({});
  };

  return (
    <AuthShell title={<>Welcome <span className="italic text-terracotta">back.</span></>} subtitle="Sign in to return to your culinary world." quote="“A table is set. Your food world has been waiting for you.”">
      {notice && <p role="status" className="mb-6 border-l-2 border-botanical bg-botanical/5 px-4 py-3 text-sm text-botanical">{notice}</p>}
      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" placeholder="you@example.com" />
        <AuthField id="password" label="Password" type="password" value={password} onChange={setPassword} error={errors.password} autoComplete="current-password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex cursor-pointer items-center gap-2 text-cocoa/75">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-[#24170f]" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-cocoa hover:underline">Forgot password?</Link>
        </div>
        {errors.form && <p role="alert" className="border-l-2 border-burnt bg-burnt/5 px-4 py-3 text-sm text-burnt">{errors.form}</p>}
        <button type="submit" disabled={loading} className={`${buttonClass('primary')} w-full py-4`}>
          {loading ? 'Opening your world…' : <>Sign in <ArrowRightIcon className="h-4 w-4" /></>}
        </button>
      </form>
      <div className="mt-8 border-t border-cocoa/10 pt-6 text-sm text-cocoa/70">
        <p>Exploring the prototype? <button type="button" onClick={useDemo} className="font-semibold text-terracotta hover:underline">Fill in the demo account</button> (Vihanga).</p>
        <p className="mt-3">New to DailyPlate? <Link to="/register" className="font-semibold text-cocoa hover:underline">Create your food identity</Link></p>
      </div>
    </AuthShell>);

}