import { toast } from 'sonner';
import { useAccount } from '../contexts/StoreContext';
import { Goal } from '../types/recipe';
import { PlanSlot } from '../types/plan';
import { completionKey, generatePlan } from '../utils/plan';
import { goals } from '../data/goals';

export function usePlanActions() {
  const { data, update, logActivity } = useAccount();

  const toggleMeal = (dayIndex: number, slot: PlanSlot, title: string) => {
    const key = completionKey(dayIndex, slot);
    const done = !data.completed[key];
    update((d) => ({ ...d, completed: { ...d.completed, [key]: done } }));
    if (done) {
      logActivity(`Enjoyed ${title}`, 'plan');
      toast.success('Meal marked as enjoyed', { description: title });
    }
  };

  const regenerate = (goal: Goal) => {
    const plan = generatePlan(data.profile, goal, Math.floor(Math.random() * 1_000_000));
    update((d) => ({ ...d, plan, completed: {}, profile: { ...d.profile, goal } }));
    const label = goals.find((g) => g.id === goal)?.label ?? goal;
    logActivity(`Generated a new ${label.toLowerCase()} plan`, 'plan');
    return plan;
  };

  const savePlan = () => {
    update((d) => d.plan ? { ...d, plan: { ...d.plan, saved: true } } : d);
    logActivity('Saved this week’s plan', 'plan');
    toast.success('Plan saved', { description: 'It will stay here until you regenerate it.' });
  };

  return { toggleMeal, regenerate, savePlan };
}