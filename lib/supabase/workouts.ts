import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return user;
}

export async function getLastSevenDaysWorkouts() {
  const user = await getUser();
  const supabase = await createClient();

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 6);
  startDate.setHours(0, 0, 0, 0);

  const { data: workouts, error } = await supabase
    .from('workouts')
    .select('id, completed_at')
    .eq('user_id', user.id)
    .gte('completed_at', startDate.toISOString());

  if (error) {
    console.error('Fehler beim Laden der Workouts:', error);
    return [];
  }

  return workouts || [];
}

export async function getRecentWorkouts() {
  const user = await getUser();
  const supabase = await createClient();

  const { data: recentWorkouts } = await supabase
    .from('workouts')
    .select('id, name, started_at, completed_at')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false })
    .limit(5);

  return recentWorkouts;
}

export async function deleteWorkout(workoutId: string) {
  const user = await getUser();
  const supabase = await createClient();

  const { error } = await supabase
    .from('workouts')
    .delete()
    .eq('id', workoutId)
    .eq('user_id', user.id);

  if (error) {
    console.log('Fehler beim Löschen des Workouts:', error.message);
    return { success: false, error: error.message };
  }

  revalidatePath('/dashboard');

  return { success: true };
}
