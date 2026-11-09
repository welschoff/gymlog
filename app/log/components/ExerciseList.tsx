'use client';

import { useState } from 'react';

type ExerciseListProps = {
  exercises: { id: string; name: string }[];
};

export default function ExerciseList({ exercises }: ExerciseListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      <h1 className="text-3xl font-header p-5">NEW WORKOUT</h1>
      <div className="px-5 pt-5 flex flex-col gap-5 text-gray-500">
        <div className="flex flex-col w-ful items-center gap-5 py-25">
          <span className="uppercase text-4xl font-black">
            no exercises yet
          </span>
          <span>Add your exercises below</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="border border-dashed p-4 w-full rounded-xl"
        >
          + Add Exercise
        </button>
      </div>

      {isOpen && (
        <form className="absolute top-0 left-0 z-20 w-full h-full bg-black/80">
          <div
            className="min-h-[25vh] w-full bg-transparent"
            onClick={() => {
              setIsOpen(false);
              setSearchTerm('');
            }}
          />

          <div className="absolute left-0 w-full bg-black text-white rounded-t-2xl flex flex-col max-h-[75vh]">
            <div className="flex justify-between items-center text-xl p-5 border rounded-t-xl border-gray-800">
              <span className="font-bold text-xl uppercase">
                choose exercise
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="text-gray-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <input
                type="text"
                className="bg-gray-700 w-full p-2 decoration-0"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex flex-col divide-gray-800 text-gray-300 divide-y-[0.5px] overflow-y-auto">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="p-4 hover:bg-zinc-600 transition-colors cursor-pointer"
                >
                  <span>{exercise.name}</span>
                </div>
              ))}
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
