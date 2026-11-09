'use client';

import { useState } from 'react';

type ExerciseListProps = {
  exercises: { id: string; name: string }[];
};

export default function ExerciseList({ exercises }: ExerciseListProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="border border-dashed p-4 w-full rounded"
      >
        + Add Exercise
      </button>

      {isOpen && (
        <div>
          <div className="flex justify-between">
            <span>CHOOSE EXERCISE</span>
            <button onClick={() => setIsOpen(false)}>X</button>
          </div>
          {exercises.map((exercise) => (
            <div key={exercise.id} className="w-full">
              <span>{exercise.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
