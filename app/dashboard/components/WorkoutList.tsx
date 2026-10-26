'use client';

import { useState } from 'react';
import WorkoutCard from './WorkoutCard';
import { deleteWorkout } from '@/lib/supabase/workouts';
import { Workout } from '@/app/types/workout';

export default function WorkoutList({
  initialWorkouts,
}: {
  initialWorkouts: Workout[];
}) {
  const [workouts, setWorkouts] = useState<Workout[]>(initialWorkouts);

  const handleDelete = async (workoutId: string) => {
    setWorkouts((prev) => prev.filter((workouts) => workouts.id !== workoutId));

    await deleteWorkout(workoutId);
  };

  if (!workouts || workouts.length === 0) {
    return (
      <p className="text-secondary text-sm mt-2">No workouts done, yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-2">
      {workouts.map((workout) => (
        <WorkoutCard
          key={workout.id}
          id={workout.id}
          started_at={workout.started_at}
          name={workout.name}
          completed_at={workout.completed_at}
          onDelete={() => handleDelete(workout.id)}
        />
      ))}
    </div>
  );
}
