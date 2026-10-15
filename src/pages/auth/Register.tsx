import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { AuthShell } from '../../components/auth/AuthShell';
import { AuthField } from '../../components/auth/AuthField';
import { useStore } from '../../contexts/StoreContext';
import { buttonClass } from '../../utils/styles';
import { passwordIssue, validEmail } from '../../utils/validation';

interface Errors {name?: string;email?: string;password?: string;confirm?: string;form?: string;}

export function Register() {
  const { register } = useStore();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = 'Tell us your name (at least 2 characters).';
    if (!validEmail(email)) next.email = 'Enter a valid email address.';
    const pw = passwordIssue(password);
    if (pw) next.password = pw;
    if (confirm !== password) next.confirm = 'Passwords don’t match.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setLoading(true);
    window.setTimeout(() => {
      const err = register(name, email, password);
      setLoading(false);
      if (err) setErrors({ email: err });else
      navigate('/app', { replace: true });
    }, 250);
  };

  return (
    <AuthShell title={<>Create your <span className="italic text-terracotta">food world.</span></>} subtitle="A minute to begin. Everything after this adapts to you." quote="“Every person has a food identity. Let’s discover yours.”">
      <form onSubmit={submit} noValidate className="space-y-5">
        <AuthField id="name" label="Name" value={name} onChange={setName} error={errors.name} autoComplete="name" placeholder="e.g. Vihanga Perera" />
        <AuthField id="email" label="Email" type="email" value={email} onChange={setEmail} error={errors.email} autoComplete="email" placeholder="you@example.com" />
        <AuthField id="password" label="Password" type="password" value={password} onChange={setPassword} error={errors.password} autoComplete="new-password" hint="At least 8 characters, including a number." />
        <AuthField id="confirm" label="Confirm password" type="password" value={confirm} onChange={setConfirm} error={errors.confirm} autoComplete="new-password" />
        <button type="submit" disabled={loading} className={`${buttonClass('primary')} w-full py-4`}>
          {loading ? 'Preparing your world…' : <>Create account <ArrowRightIcon className="h-4 w-4" /></>}
        </button>
      </form>
      <p className="mt-8 border-t border-cocoa/10 pt-6 text-sm text-cocoa/70">Already have an account? <Link to="/login" className="font-semibold text-cocoa hover:underline">Sign in</Link></p>
    </AuthShell>);

}