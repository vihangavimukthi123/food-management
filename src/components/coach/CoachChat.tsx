import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRightIcon, ArrowUpIcon, RotateCcwIcon, Sparkles } from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { ChatMessage, CoachAction } from '../../types/plan';
import { coachGreeting, coachRespond } from '../../utils/coach';
import { uid } from '../../utils/dates';
import { SuggestedRecipes } from './SuggestedRecipes';
import { LogoMark } from '../Logo';

const suggested = [
  'What should I eat to support my goal?',
  'Suggest a healthy breakfast',
  'How can I improve my eating habits?',
  'What can I prepare using my ingredients?',
  'Suggest high-protein meals',
  'Give me healthy snack ideas',
  'How can I reduce food waste?',
  'Suggest a meal using ingredients I already have'
];

const actionLinks: Record<Exclude<CoachAction, 'build-plan'>, { to: string; label: string }> = {
  'my-plan': { to: '/app/plan', label: 'Open My Plan' },
  kitchen: { to: '/app/kitchen', label: 'Open My Kitchen' },
  waste: { to: '/app/waste', label: 'Visit Food Rescue' },
  recipes: { to: '/app/recipes', label: 'Browse recipes' },
  profile: { to: '/app/profile', label: 'Update my profile' },
  substitutions: { to: '/app/substitutions', label: 'Open the Flavour Lab' }
};

interface CoachChatProps {
  initialPrompt?: string;
  onBuildPlan: () => void;
}

export function CoachChat({ initialPrompt, onBuildPlan }: CoachChatProps) {
  const { data, update, logActivity } = useAccount();
  const [draft, setDraft] = useState('');
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentInitial = useRef(false);
  const messages = data.chat;

  const send = (text: string) => {
    const clean = text.trim();
    if (!clean || thinking) return;
    const userMsg: ChatMessage = { id: uid(), role: 'user', text: clean, createdAt: new Date().toISOString() };
    update((d) => ({ ...d, chat: [...d.chat, userMsg].slice(-40) }));
    setDraft('');
    setThinking(true);
    window.setTimeout(() => {
      const reply = coachRespond(clean, data.profile, data.pantry);
      const coachMsg: ChatMessage = {
        id: uid(),
        role: 'coach',
        text: reply.text,
        recipeIds: reply.recipeIds,
        action: reply.action,
        createdAt: new Date().toISOString()
      };
      update((d) => ({ ...d, chat: [...d.chat, coachMsg].slice(-40) }));
      setThinking(false);
    }, 650);
    if (messages.length === 0) logActivity('Started a conversation with your coach', 'coach');
  };

  useEffect(() => {
    if (initialPrompt && !sentInitial.current) {
      sentInitial.current = true;
      send(initialPrompt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length, thinking]);

  return (
    <div className="flex h-[calc(100svh-220px)] min-h-[580px] flex-col text-cocoa">
      <div ref={scrollRef} className="no-scrollbar flex-1 space-y-7 overflow-y-auto pb-6 pr-2" aria-live="polite">
        <CoachLine text={coachGreeting(data.profile)} />

        {messages.map((m) =>
          m.role === 'user' ? (
            <motion.p
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-forest px-5 py-3 text-[0.95rem] font-medium text-cream shadow-sm"
            >
              {m.text}
            </motion.p>
          ) : (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-[#e2d5c2] bg-[#fdfbf7] p-5 shadow-xs"
            >
              <CoachLine text={m.text} />
              {m.recipeIds && (
                <div className="mt-4 pl-10">
                  <SuggestedRecipes ids={m.recipeIds} />
                </div>
              )}
              {m.action && (
                <div className="mt-4 pl-10">
                  {m.action === 'build-plan' ? (
                    <button
                      type="button"
                      onClick={onBuildPlan}
                      className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-xs font-bold text-cream shadow-xs transition-colors hover:bg-emerald-900"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      Build My Food Plan <ArrowRightIcon className="h-4 w-4" />
                    </button>
                  ) : (
                    <Link
                      to={actionLinks[m.action].to}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:underline"
                    >
                      {actionLinks[m.action].label} <ArrowRightIcon className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              )}
            </motion.div>
          )
        )}

        <AnimatePresence>
          {thinking && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 pl-2 text-xs italic text-cocoa/60"
            >
              <span className="flex gap-1" aria-hidden="true">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-forest"
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                  />
                ))}
              </span>
              Formulating recommendation matching your profile and pantry stock…
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Suggested Quick Prompt Chips */}
      {messages.length < 5 && (
        <div className="no-scrollbar -mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1 lg:flex-wrap">
          {suggested.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              className="shrink-0 rounded-full border border-[#d8c8b0] bg-[#f2e7d7] px-3.5 py-1.5 text-xs font-medium text-cocoa transition-all hover:border-forest hover:bg-[#e8dbca]"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
        className="flex items-end gap-3 rounded-2xl border border-[#d8c8b0] bg-[#fdfbf7] p-2.5 shadow-sm focus-within:border-forest focus-within:ring-1 focus-within:ring-forest/30"
      >
        <label htmlFor="coach-input" className="sr-only">
          Message your coach
        </label>
        <textarea
          id="coach-input"
          rows={1}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              send(draft);
            }
          }}
          placeholder="Ask about meals, ingredients, leftovers, nutritional balance..."
          className="max-h-32 flex-1 resize-none bg-transparent px-3 py-1.5 font-display text-lg text-cocoa placeholder:text-cocoa/40 focus:outline-none"
        />

        {messages.length > 0 && (
          <button
            type="button"
            onClick={() => update((d) => ({ ...d, chat: [] }))}
            aria-label="Clear conversation"
            className="rounded-full p-2 text-cocoa/40 transition-colors hover:text-cocoa"
          >
            <RotateCcwIcon className="h-4 w-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={!draft.trim() || thinking}
          aria-label="Send"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-cream transition-all hover:bg-emerald-900 disabled:opacity-40"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
}

function CoachLine({ text }: { text: string }) {
  return (
    <div className="flex gap-3.5 items-start">
      <span className="mt-1 shrink-0">
        <LogoMark size={24} tone="onLight" />
      </span>
      <p className="font-display text-[1.25rem] leading-snug text-cocoa">{text}</p>
    </div>
  );
}