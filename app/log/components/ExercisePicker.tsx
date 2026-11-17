'use client';

import { useState } from 'react';

type ExerciseListProps = {
  exercises: { id: string; name: string }[];
};

export default function ExercisePicker({ exercises }: ExerciseListProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="relative">
      <h1 className="text-3xl font-header p-5">NEW WORKOUT</h1>
      <div className="px-4 flex flex-col text-[#27272A]">
        <div className="flex flex-col w-ful items-center gap-5 py-25">
          <span className="uppercase text-4xl font-black">
            no exercises yet
          </span>
          <span className="text-[#494952]">Add your first exercise below</span>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="border border-dashed p-4 w-full rounded-xl text-[#494952]"
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

            <div className="flex justify-center w-full">
              <input
                type="text"
                placeholder="Search exercise..."
                className="m-5 p-3 bg-[#18181B] border border-gray-500 rounded-xl decoration-0 w-full focus:outline-highlight"
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
