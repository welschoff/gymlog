import { getExercises } from '@/lib/supabase/workouts';
import ExercisePicker from './components/ExercisePicker';

export default async function LogPage() {
  const exercises = await getExercises();

  return (
    <div>
      <ExercisePicker exercises={exercises ?? []} />
    </div>
  );
}
