import { getExercises } from '@/lib/supabase/workouts';
import ExerciseList from './components/ExerciseList';

export default async function LogPage() {
  const exercises = await getExercises();

  return (
    <div>
      <ExerciseList exercises={exercises ?? []} />
    </div>
  );
}
