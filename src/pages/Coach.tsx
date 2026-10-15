import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MessageCircleIcon, PencilIcon, SparklesIcon, Calendar, Package, Heart, ChefHat } from 'lucide-react';
import { useAccount } from '../contexts/StoreContext';
import { CoachOrb } from '../components/coach/CoachOrb';
import { CoachChat } from '../components/coach/CoachChat';
import { BuildPlanFlow } from '../components/coach/BuildPlanFlow';
import { SafeImage } from '../components/SafeImage';
import { SpiceDust } from '../components/ambient/SpiceDust';
import { DriftingLeaves } from '../components/ambient/DriftingLeaves';
import { images } from '../data/images';
import { goals } from '../data/goals';
import { allergenLabel } from '../utils/recommend';

export function Coach() {
  const { data } = useAccount();
  const location = useLocation();
  const initialPrompt = (location.state as { prompt?: string } | null)?.prompt;
  const [mode, setMode] = useState<'chat' | 'build'>(() => ((location.state as { build?: boolean } | null)?.build ? 'build' : 'chat'));
  const navigate = useNavigate();
  const p = data.profile;
  const goal = goals.find((g) => g.id === p.goal);

  useEffect(() => {
    if (location.state) navigate(location.pathname, { replace: true, state: null });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const facts = [
    { k: 'Goal', v: goal?.label ?? '—', icon: Heart },
    { k: 'Avoids', v: p.allergies.length ? p.allergies.map(allergenLabel).join(', ') : 'No allergies noted', icon: SparklesIcon },
    { k: 'Diet', v: p.restrictions.length ? p.restrictions.join(', ') : 'No restrictions', icon: SparklesIcon },
    { k: 'Cooking', v: p.cookingLevel[0].toUpperCase() + p.cookingLevel.slice(1), icon: ChefHat },
    { k: 'Kitchen', v: `${data.pantry.length} ingredients tracked`, icon: Package },
    { k: 'Schedule', v: `${Object.values(p.schedule?.days || {}).filter((x) => x === 'busy').length} busy days/wk`, icon: Calendar },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f4ece1] text-cocoa">
      {/* Rich Botanical Hero Banner */}
      <header className="relative overflow-hidden bg-gradient-to-r from-[#183626] via-[#244c36] to-[#1a3828] text-cream">
        <div className="absolute inset-0 opacity-20">
          <SafeImage
            eager
            src={images.coach}
            alt="Artisanal food preparation"
            className="h-full w-full object-cover object-left"
            fallbackTone="dark"
          />
        </div>
        <DriftingLeaves
          color="#d4a843"
          opacity={0.4}
          leaves={[
            { x: 92, y: 20, size: 65, rotate: -30, shape: 'sprig', duration: 22 },
            { x: 10, y: 55, size: 40, rotate: 40, shape: 'curry', duration: 18 },
          ]}
        />
        <SpiceDust count={24} color="#f0d59e" />

        <div className="relative mx-auto max-w-[1440px] px-6 py-12 lg:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <CoachOrb size={84} />
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-xs font-bold uppercase tracking-wider text-champagne">
                  ✦ AI Culinary Studio
                </span>
                <h1 className="mt-2 font-display text-4xl sm:text-5xl font-bold text-cream">
                  DailyPlate <span className="italic text-champagne">Coach</span>
                </h1>
                <p className="mt-1 text-sm text-cream/80 max-w-xl">
                  Conversational food guidance and personalized meal generation attuned to your pantry, schedule, and budget.
                </p>
              </div>
            </div>

            {/* Mode Switcher Tabs */}
            <div
              className="flex items-center gap-1.5 rounded-2xl bg-white/10 p-1.5 backdrop-blur-xs border border-cream/20 shrink-0"
              role="tablist"
              aria-label="Coach mode"
            >
              {[
                { id: 'chat', label: 'Conversation', icon: MessageCircleIcon },
                { id: 'build', label: 'Build 7-Day Plan', icon: SparklesIcon },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={mode === t.id}
                  onClick={() => setMode(t.id as 'chat' | 'build')}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all duration-150 ${
                    mode === t.id
                      ? 'bg-cream text-forest shadow-md'
                      : 'text-cream/80 hover:bg-white/10 hover:text-cream'
                  }`}
                >
                  <t.icon className="h-4 w-4" aria-hidden="true" />
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="relative mx-auto grid max-w-[1440px] gap-8 px-6 py-10 lg:grid-cols-[320px_1fr] lg:gap-12 lg:px-10">
        {/* Left Sidebar Profile Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start space-y-6">
          <section
            aria-labelledby="coach-knows"
            className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-6 shadow-sm"
          >
            <div className="flex items-baseline justify-between border-b border-[#e3d5be] pb-3">
              <h2 id="coach-knows" className="text-xs font-bold uppercase tracking-wider text-forest">
                What I Know About You
              </h2>
              <Link
                to="/app/profile"
                className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 hover:underline"
              >
                <PencilIcon className="h-3 w-3" />
                Edit
              </Link>
            </div>

            <dl className="mt-4 space-y-3">
              {facts.map((f) => (
                <div key={f.k} className="flex items-start justify-between text-xs py-1">
                  <dt className="font-semibold text-cocoa/60">{f.k}</dt>
                  <dd className="font-bold text-cocoa text-right max-w-[180px] truncate">{f.v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 pt-4 border-t border-[#e3d5be] text-[11px] leading-relaxed text-cocoa/60">
              Recommendations adapt in real time to your preferences, pantry shelf-life, and equipment.
            </div>
          </section>

          {/* Quick Helpful Prompt Pills */}
          {mode === 'chat' && (
            <div className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-5 shadow-xs">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cocoa/60 mb-3">Quick Questions</h3>
              <div className="flex flex-col gap-2">
                {[
                  'What can I cook with my expiring items?',
                  'Plan a high-protein dinner for tonight',
                  'Suggest a quick 15-minute lunch',
                ].map((promptText) => (
                  <button
                    key={promptText}
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('coach-input') as HTMLTextAreaElement | null;
                      if (input) {
                        input.value = promptText;
                        input.focus();
                      }
                    }}
                    className="text-left rounded-xl bg-[#f0e6d6] hover:bg-[#e6d8c4] border border-[#dccbb4] p-2.5 text-xs font-medium text-cocoa transition-colors"
                  >
                    "{promptText}"
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>

        {/* Right Section: Mode View */}
        <section
          aria-label={mode === 'chat' ? 'Conversation with your coach' : 'Build a Plan'}
          className="rounded-2xl border border-[#d8c8b0] bg-[#faf5eb] p-6 shadow-sm md:p-8"
        >
          {mode === 'chat' ? (
            <CoachChat initialPrompt={initialPrompt} onBuildPlan={() => setMode('build')} />
          ) : (
            <BuildPlanFlow onExit={() => setMode('chat')} />
          )}
        </section>
      </div>
    </div>
  );
}