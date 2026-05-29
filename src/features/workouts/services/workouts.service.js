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

export async function createWorkout({ userId, name, description }) {
  const { data, error } = await supabase
    .from('workouts')
    .insert({
      user_id: userId,
      name: name,
      description: description || null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
