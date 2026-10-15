import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'sonner';
import { CameraIcon } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { images, recipeImages } from '../data/images';
import { goals } from '../data/goals';
import { ProfileForm } from '../components/profile/ProfileForm';
import { SafeImage } from '../components/SafeImage';
import { Profile as ProfileType } from '../types/user';
import { allergenLabel, listJoin } from '../utils/recommend';
import { buttonClass } from '../utils/styles';

const categoryImages: Record<string, string> = {
  'Sri Lankan': recipeImages.kiribath, Healthy: recipeImages.gotukola, 'High-protein': recipeImages.salmonBowl, Vegan: recipeImages.chickpea,
  Vegetarian: recipeImages.panzanella, Breakfast: recipeImages.avocadoToast, Desserts: recipeImages.mousse, Snacks: recipeImages.greenGram,
  Quick: recipeImages.friedRice, Family: recipeImages.pesto, Lunch: recipeImages.redRiceDhal, Dinner: recipeImages.stirfry, International: recipeImages.shakshuka
};

function identitySentence(p: ProfileType): string {
  const goal = goals.find((g) => g.id === p.goal)?.label.toLowerCase();
  const from = p.location ? ` from ${p.location.split(',')[0]}` : '';
  const loves = p.favourites.length ? ` who loves ${listJoin(p.favourites.slice(0, 3).map((f) => f.toLowerCase()))}` : '';
  const avoids = p.allergies.length ? `, avoids ${listJoin(p.allergies.map((a) => allergenLabel(a).toLowerCase()))}` : '';
  return `A ${p.cookingLevel} cook${from}${loves}${avoids}, eating for ${goal}.`;
}

export function Profile() {
  const { data, update, renameUser, logActivity } = useAccount();
  const [draft, setDraft] = useState<ProfileType>(data.profile);
  useEffect(() => setDraft(data.profile), [data.profile]);
  const dirty = useMemo(() => JSON.stringify(draft) !== JSON.stringify(data.profile), [draft, data.profile]);

  const save = () => {
    if (draft.name.trim().length < 2) return toast.error('Your name needs at least 2 characters.');
    update((d) => ({ ...d, profile: { ...draft, name: draft.name.trim() } }));
    renameUser(draft.name.trim());
    logActivity('Updated your food identity', 'profile');
    toast.success('Profile saved', { description: 'Coach, plan, recipes and leftovers now use your changes.' });
    return undefined;
  };

  const onAvatar = (file?: File) => {
    if (!file) return;
    if (file.size > 1.5 * 1024 * 1024) {toast.error('Choose an image under 1.5 MB.');return;}
    const reader = new FileReader();
    reader.onload = () => {
      update((d) => ({ ...d, profile: { ...d.profile, avatar: String(reader.result) } }));
      toast.success('Profile photo updated');
    };
    reader.readAsDataURL(file);
  };

  const p = data.profile;
  const weights = [...p.cuisines.map((c) => ({ w: c, s: 3 })), ...p.favourites.map((f) => ({ w: f, s: 2 })), ...p.preferredIngredients.map((f) => ({ w: f, s: 1.5 })), ...p.categories.map((c) => ({ w: c, s: 1 }))];

  return (
    <div className="grain min-h-screen bg-beige text-cocoa">
      <div className="mx-auto max-w-[1440px] px-5 pb-32 pt-24 lg:px-8 lg:pt-28">
        <header className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-16">
          <div className="relative">
            <SafeImage eager src={p.avatar || images.profile} alt={p.avatar ? `${p.name}'s profile photo` : 'Hands holding a bowl of fresh ingredients'} className="aspect-[4/5] w-full object-cover" />
            <label className="absolute bottom-4 left-4 flex cursor-pointer items-center gap-2 bg-ivory px-4 py-2.5 text-sm font-semibold shadow-lg transition-colors duration-150 hover:bg-cream">
              <CameraIcon className="h-4 w-4" />{p.avatar ? 'Change photo' : 'Add your photo'}
              <input type="file" accept="image/*" className="sr-only" onChange={(e) => onAvatar(e.target.files?.[0])} />
            </label>
          </div>
          <div className="flex flex-col">
            <p className="font-display text-xl italic text-terracotta">Your food identity</p>
            <h1 className="mt-3 font-display text-6xl leading-[0.95] lg:text-8xl">{p.name}</h1>
            <p className="mt-3 text-sm text-cocoa/60">{[p.age && `${p.age} years`, p.location, p.occupation].filter(Boolean).join(' · ') || 'Add your details below'}</p>
            <p className="mt-8 max-w-2xl font-display text-3xl leading-snug">{identitySentence(p)}</p>

            <div className="mt-10">
              <h2 className="text-xs font-semibold text-cocoa/55">Taste map</h2>
              {weights.length ?
              <p className="mt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  {weights.map(({ w, s }) => <span key={w} className="font-display leading-tight" style={{ fontSize: `${1 + s * 0.45}rem`, color: s >= 3 ? '#c0623f' : s >= 2 ? '#24170f' : '#5c3f2c' }}>{w}</span>)}
                </p> :
              <p className="mt-3 text-sm text-cocoa/60">Add favourites and cuisines below to draw your taste map.</p>}
            </div>

            {p.categories.length > 0 &&
            <ul className="mt-auto flex gap-3 overflow-x-auto pt-10 no-scrollbar">
                {p.categories.map((c) =>
              <li key={c} className="w-28 shrink-0">
                    <SafeImage src={categoryImages[c] ?? recipeImages.redRiceDhal} alt="" className="aspect-square w-full object-cover" />
                    <p className="mt-1.5 text-xs font-semibold">{c}</p>
                  </li>
              )}
              </ul>
            }
          </div>
        </header>

        <div className="mt-20"><ProfileForm value={draft} onChange={setDraft} /></div>
      </div>

      <AnimatePresence>
        {dirty &&
        <motion.div className="fixed inset-x-0 bottom-0 z-40 border-t border-cocoa/15 bg-ivory/95 backdrop-blur-md" initial={{ y: 80 }} animate={{ y: 0 }} exit={{ y: 80 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
            <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-5 py-4 lg:px-8">
              <p className="text-sm text-cocoa/70">You have unsaved changes to your food identity.</p>
              <div className="flex gap-3">
                <button type="button" onClick={() => setDraft(data.profile)} className={buttonClass('secondary')}>Discard</button>
                <button type="button" onClick={save} className={buttonClass('primary')}>Save changes</button>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}