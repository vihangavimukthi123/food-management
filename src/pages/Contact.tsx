import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { inputClass, buttonClass } from '../utils/styles';
import { validEmail } from '../utils/validation';
import { PrototypeNotice } from '../components/PrototypeNotice';
import { SafeImage } from '../components/SafeImage';
import { recipeImages } from '../data/images';

const subjects = ['General feedback', 'AI Coach & Build a Plan', 'My Plan', 'Recipes', 'My Kitchen & Food Rescue', 'Something isn’t working'];
const blank = { name: '', email: '', subject: subjects[0], message: '' };

export function Contact() {
  const [v, setV] = useState(blank);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const set = (k: keyof typeof blank, val: string) => setV((p) => ({ ...p, [k]: val }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (v.name.trim().length < 2) next.name = 'Tell us your name.';
    if (!validEmail(v.email)) next.email = 'Enter a valid email address.';
    if (v.message.trim().length < 10) next.message = 'Write at least 10 characters.';
    setErrors(next);
    if (Object.keys(next).length) return;
    setStatus('sending');
    window.setTimeout(() => setStatus('sent'), 500);
  };

  return (
    <div className="bg-cocoa text-cream">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 pb-24 pt-36 lg:grid-cols-[1fr_1.1fr] lg:px-10">
        <div>
          <h1 className="font-display text-6xl leading-[0.95] sm:text-7xl">Pull up a chair. <span className="italic text-champagne">Tell us anything.</span></h1>
          <p className="mt-6 max-w-md text-cream/70">Ideas, questions, a recipe you’d love to see — every note helps shape DailyPlate.</p>
          <SafeImage src={recipeImages.mousse} alt="Chocolate mousse in glasses on a wooden table" className="mt-12 hidden aspect-[4/3] w-full max-w-md object-cover lg:block" fallbackTone="dark" />
          <address className="mt-10 space-y-1 text-sm not-italic text-cream/65">
            <p>hello@dailyplate.app</p>
            <p>Colombo, Sri Lanka</p>
            <p className="text-xs text-cream/40">Demonstration contact details</p>
          </address>
        </div>
        <div className="grain bg-ivory p-8 text-cocoa sm:p-12">
          {status === 'sent' ?
          <motion.div role="status" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.28 }} className="py-16 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-botanical text-cream"><CheckIcon className="h-6 w-6" /></span>
              <h2 className="mt-6 font-display text-4xl">Thank you, {v.name.split(' ')[0]}.</h2>
              <p className="mx-auto mt-3 max-w-sm text-cocoa/65">Your message about “{v.subject.toLowerCase()}” was received. In this prototype nothing is actually sent.</p>
              <button type="button" onClick={() => {setV(blank);setStatus('idle');}} className={`${buttonClass('secondary')} mt-8`}>Send another</button>
            </motion.div> :

          <form onSubmit={submit} noValidate className="space-y-5">
              <h2 className="font-display text-3xl">Contact & feedback</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-sm font-semibold">Name</label>
                  <input id="c-name" value={v.name} onChange={(e) => set('name', e.target.value)} className={inputClass()} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                  {errors.name && <p className="mt-1 text-xs text-burnt">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-sm font-semibold">Email</label>
                  <input id="c-email" type="email" value={v.email} onChange={(e) => set('email', e.target.value)} className={inputClass()} autoComplete="email" aria-invalid={Boolean(errors.email)} />
                  {errors.email && <p className="mt-1 text-xs text-burnt">{errors.email}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="c-subject" className="mb-2 block text-sm font-semibold">Subject</label>
                <select id="c-subject" value={v.subject} onChange={(e) => set('subject', e.target.value)} className={inputClass()}>{subjects.map((s) => <option key={s}>{s}</option>)}</select>
              </div>
              <div>
                <label htmlFor="c-msg" className="mb-2 block text-sm font-semibold">Message</label>
                <textarea id="c-msg" rows={6} value={v.message} onChange={(e) => set('message', e.target.value)} className={inputClass()} aria-invalid={Boolean(errors.message)} />
                {errors.message && <p className="mt-1 text-xs text-burnt">{errors.message}</p>}
              </div>
              <button type="submit" disabled={status === 'sending'} className={`${buttonClass('primary')} w-full py-4`}>{status === 'sending' ? 'Sending…' : 'Send message'}</button>
              <PrototypeNotice>Demonstration form — your message stays on this page and isn’t sent anywhere.</PrototypeNotice>
            </form>
          }
        </div>
      </div>
    </div>);

}