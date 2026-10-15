import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { AuthShell } from '../../components/auth/AuthShell';
import { AuthField } from '../../components/auth/AuthField';
import { useStore } from '../../contexts/StoreContext';
import { buttonClass } from '../../utils/styles';
import { passwordIssue, validEmail } from '../../utils/validation';

interface Errors {email?: string;code?: string;password?: string;confirm?: string;}

export function ResetPassword() {
  const { resetPassword } = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [email, setEmail] = useState(params.get('email') ?? '');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (!validEmail(email)) next.email = 'Enter a valid email address.';
    if (!/^\d{6}$/.test(code.trim())) next.code = 'Enter the 6-digit code.';
    const pw = passwordIssue(password);
    if (pw) next.password = pw;
    if (confirm !== password) next.confirm = 'Passwords don’t match.';
    setErrors(next);
    if (Object.keys(next).length) return;
    const err = resetPassword(email, code, password);
    if (err) return setErrors({ code: err });
    navigate('/login', { state: { notice: 'Your password has been reset. Sign in with your new password.' } });
    return undefined;
  };

  return (
    <AuthShell title={<>Set a new <span className="italic text-terracotta">password.</span></>} subtitle="Enter the code from the previous step and choose a new password." quote="“A fresh start, like the first morning’s kiribath.”">
      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" />
        <AuthField id="code" label="Reset code" value={code} onChange={setCode} error={errors.code} placeholder="6 digits" />
        <AuthField id="password" label="New password" type="password" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" hint="At least 8 characters, including a number." />
        <AuthField id="confirm" label="Confirm new password" type="password" value={confirm} onChange={setConfirm} error={errors.confirm} autoComplete="new-password" />
        <button type="submit" className={`${buttonClass('primary')} w-full py-4`}>Reset password</button>
      </form>
      <p className="mt-8 border-t border-cocoa/10 pt-6 text-sm text-cocoa/70">Need a new code? <Link to="/forgot-password" className="font-semibold text-cocoa hover:underline">Request again</Link></p>
    </AuthShell>);

}