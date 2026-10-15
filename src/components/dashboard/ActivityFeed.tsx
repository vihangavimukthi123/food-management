import React from 'react';
import { BookOpenIcon, CalendarDaysIcon, CarrotIcon, RecycleIcon, SproutIcon, UserIcon } from 'lucide-react';
import { useAccount } from '../../contexts/StoreContext';
import { ActivityKind } from '../../types/user';
import { timeAgo } from '../../utils/dates';

const icons: Record<ActivityKind, typeof BookOpenIcon> = {
  recipe: BookOpenIcon, plan: CalendarDaysIcon, kitchen: CarrotIcon, waste: RecycleIcon, coach: SproutIcon, profile: UserIcon
};

export function ActivityFeed() {
  const { data } = useAccount();
  const items = data.activity.slice(0, 6);
  return (
    <section aria-labelledby="activity">
      <h2 id="activity" className="font-display text-3xl">Recent activity</h2>
      {items.length ?
      <ol className="relative mt-5 space-y-5 border-l border-cocoa/15 pl-6">
          {items.map((a) => {
          const Icon = icons[a.kind];
          return (
            <li key={a.id} className="relative">
                <span className="absolute -left-[33px] flex h-4 w-4 items-center justify-center rounded-full bg-cream ring-1 ring-cocoa/20" aria-hidden="true"><Icon className="h-2.5 w-2.5 text-cocoa/60" /></span>
                <p className="text-sm text-cocoa">{a.text}</p>
                <p className="text-xs text-cocoa/50">{timeAgo(a.at)}</p>
              </li>);

        })}
        </ol> :

      <p className="mt-4 text-sm text-cocoa/60">Your food journey will appear here as you cook, save and plan.</p>
      }
    </section>);

}