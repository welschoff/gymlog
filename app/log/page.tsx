import { getExercises } from '@/lib/supabase/workouts';
import ExerciseList from './components/ExerciseList';

export default async function LogPage() {
  const exercises = await getExercises();

  return (
    <div>
      <h1 className="text-3xl font-header">NEW WORKOUT</h1>
      <ExerciseList exercises={exercises ?? []} />
    </div>
  );
}
