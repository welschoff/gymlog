'use client';

import { useState } from 'react';
import { SelectedExercise } from './ExercisePicker';

type Exercise = {
  id: string;
  name: string;
};

type ExerciseModalProps = {
  exercises: Exercise[];
  selectedExercises: SelectedExercise[];
  onClose: () => void;
  onSelect: (exercise: Exercise) => void;
};

export default function ExerciseModal({
  exercises,
  selectedExercises,
  onClose,
  onSelect,
}: ExerciseModalProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="fixed inset-0 z-20 w-full h-full bg-black/80 flex flex-col justify-end">
      <div className="flex-1 w-full bg-transparent" onClick={onClose} />

      <div className="w-full bg-black text-white rounded-t-2xl flex flex-col max-h-[75vh]">
        <div className="flex justify-between items-center text-xl p-5 border-b border-zinc-900">
          <span className="font-bold text-xl uppercase tracking-wider">
            choose exercise
          </span>
          <button
            type="button"
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        <div className="flex justify-center w-full px-5">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search exercise..."
            className="my-4 p-3 bg-[#18181B] border border-zinc-800 rounded-xl w-full focus:outline-none focus:border-zinc-500 transition-colors"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col divide-zinc-900 text-zinc-300 divide-y-[0.5px] overflow-y-auto px-5 pb-5">
          {filteredExercises.map((exercise) => {
            const isAlreadyAdded = selectedExercises.some(
              (item) => item.id === exercise.id,
            );

            return (
              <div
                key={exercise.id}
                onClick={() => onSelect(exercise)}
                className="py-4 hover:bg-zinc-900/50 transition-colors cursor-pointer flex justify-between items-center"
              >
                <span className="font-medium">{exercise.name}</span>
                {isAlreadyAdded && (
                  <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                    Added ✓
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
