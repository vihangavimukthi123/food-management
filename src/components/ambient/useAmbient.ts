import { useReducedMotion } from 'framer-motion';
import { useStore } from '../../contexts/StoreContext';

/** Ambient background motion respects OS reduced-motion and the user's in-app setting. */
export function useAmbient(): boolean {
  const reduced = useReducedMotion();
  const { data } = useStore();
  if (reduced) return false;
  if (data && (!data.settings.ambientMotion || data.settings.reduceMotion)) return false;
  return true;
}