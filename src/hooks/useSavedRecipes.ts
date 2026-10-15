import { toast } from 'sonner';
import { useAccount } from '../contexts/StoreContext';
import { getRecipe } from '../utils/recommend';

export function useSavedRecipes() {
  const { data, update, logActivity } = useAccount();
  const isSaved = (id: string) => data.saved.includes(id);
  const toggleSave = (id: string) => {
    const title = getRecipe(id)?.title ?? 'Recipe';
    if (isSaved(id)) {
      update((d) => ({ ...d, saved: d.saved.filter((x) => x !== id) }));
      toast('Removed from saved recipes', { description: title });
    } else {
      update((d) => ({ ...d, saved: [id, ...d.saved] }));
      logActivity(`Saved ${title}`, 'recipe');
      toast.success('Saved to your recipes', { description: title });
    }
  };
  return { isSaved, toggleSave, saved: data.saved };
}