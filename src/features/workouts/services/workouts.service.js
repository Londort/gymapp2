import { supabase } from '@/lib/supabase/client';

export async function listWorkouts() {
  const { data, error } = await supabase
    .from('workouts')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}
