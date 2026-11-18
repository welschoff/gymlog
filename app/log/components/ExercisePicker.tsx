'use client';

import { useState } from 'react';
import ExerciseModal from './ExerciseModal';
import ExerciseCard from './ExerciseCard';
import { saveWorkout } from '@/lib/supabase/workouts';

export type Set = {
  id: string;
  kg: string;
  reps: string;
};

export type SelectedExercise = {
  id: string;
  instanceId: string;
  name: string;
  sets: Set[];
};

type Exercise = {
  id: string;
  name: string;
};

type ExercisePickerProps = {
  exercises: Exercise[];
};

export default function ExercisePicker({ exercises }: ExercisePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState('NEW WORKOUT');
  const [selectedExercises, setSelectedExercises] = useState<
    SelectedExercise[]
  >([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSelectExercise = (exercise: Exercise) => {
    const newInstance: SelectedExercise = {
      id: exercise.id, // Das ist die echte ID aus der DB!
      instanceId: crypto.randomUUID(),
      name: exercise.name,
      sets: [{ id: crypto.randomUUID(), kg: '', reps: '' }],
    };

    setSelectedExercises((prev) => [...prev, newInstance]);
    setIsOpen(false);
  };

  const handleRemoveExercise = (instanceId: string) => {
    setSelectedExercises((prev) =>
      prev.filter((item) => item.instanceId !== instanceId),
    );
  };

  const handleUpdateExercise = (instanceId: string, updatedSets: Set[]) => {
    setSelectedExercises((prev) =>
      prev.map((ex) =>
        ex.instanceId === instanceId ? { ...ex, sets: updatedSets } : ex,
      ),
    );
  };

  const handleSaveWorkout = async () => {
    if (selectedExercises.length === 0) {
      alert('Please add at least one exercise.');
      return;
    }

    setIsSaving(true);
    try {
      const result = await saveWorkout(workoutName, selectedExercises);

      if (result.success) {
        alert('Workout saved successfully!');
        setSelectedExercises([]);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error('Failed to save workout:', error);
      alert('An unexpected error occurred.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white pb-24">
      <div className="max-w-xl mx-auto px-4">
        <input
          type="text"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
          className="text-3xl font-black p-2 mt-5 mb-2 bg-transparent w-full uppercase focus:outline-none focus:shadow-[0_2px_0_0_#71717a]"
        />

        <div className="flex flex-col gap-5 mt-4">
          {selectedExercises.length === 0 ? (
            <div className="flex flex-col w-full items-center gap-4 py-20 text-[#27272A]">
              <span className="uppercase text-3xl font-black tracking-wide">
                no exercises yet
              </span>
              <span className="text-[#494952]">
                Add your first exercise below
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {selectedExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.instanceId}
                  exercise={exercise}
                  onRemove={() => handleRemoveExercise(exercise.instanceId)}
                  onUpdate={(updatedSets) =>
                    handleUpdateExercise(exercise.instanceId, updatedSets)
                  }
                />
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="border border-dashed border-[#494952] p-4 w-full rounded-xl text-[#8e8e93] hover:border-gray-400 transition-colors uppercase font-bold text-sm tracking-wider"
          >
            + Add Exercise
          </button>

          {selectedExercises.length > 0 && (
            <button
              type="button"
              disabled={isSaving}
              onClick={handleSaveWorkout}
              className="bg-white text-black p-4 w-full rounded-xl font-black uppercase tracking-wider hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-2"
            >
              {isSaving ? 'Saving to DB...' : 'Save Workout'}
            </button>
          )}
        </div>
      </div>

      {isOpen && (
        <ExerciseModal
          exercises={exercises}
          selectedExercises={selectedExercises}
          onClose={() => setIsOpen(false)}
          onSelect={handleSelectExercise}
        />
      )}
    </div>
  );
}
