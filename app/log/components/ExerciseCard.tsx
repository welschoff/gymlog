'use client';

import { SelectedExercise, Set } from './ExercisePicker';

type ExerciseCardProps = {
  exercise: SelectedExercise;
  onRemove: () => void;
  onUpdate: (sets: Set[]) => void;
};

export default function ExerciseCard({
  exercise,
  onRemove,
  onUpdate,
}: ExerciseCardProps) {
  const handleAddSet = () => {
    const newSet: Set = {
      id: crypto.randomUUID(),
      kg: '',
      reps: '',
    };
    onUpdate([...exercise.sets, newSet]);
  };

  const handleRemoveSet = (setId: string) => {
    const updated = exercise.sets.filter((set) => set.id !== setId);
    onUpdate(updated);
  };

  const handleSetChange = (
    setId: string,
    field: 'kg' | 'reps',
    value: string,
  ) => {
    const updated = exercise.sets.map((set) =>
      set.id === setId || set.id === setId ? { ...set, [field]: value } : set,
    );
    onUpdate(updated);
  };

  const completedSets = exercise.sets.filter(
    (s) => s.kg !== '' && s.reps !== '',
  ).length;

  return (
    <div className="bg-[#18181b]/50 border border-zinc-800/80 rounded-2xl p-4 sm:p-5 flex flex-col gap-4 w-full box-border overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white">
            {exercise.name}
          </h2>
          <span className="text-xs text-zinc-500 font-medium">
            {completedSets}/{exercise.sets.length} sets
          </span>
        </div>
        <button
          type="button"
          onClick={onRemove}
          className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-[2.5rem_1fr_1fr_1.5rem] sm:grid-cols-[3rem_1fr_1fr_2rem] gap-2 sm:gap-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1">
        <div className="text-center">Set</div>
        <div className="text-center">KG</div>
        <div className="text-center">Reps</div>
        <div></div>
      </div>

      <div className="flex flex-col gap-3">
        {exercise.sets.map((set, index) => (
          <div
            key={set.id}
            className="grid grid-cols-[2.5rem_1fr_1fr_1.5rem] sm:grid-cols-[3rem_1fr_1fr_2rem] gap-2 sm:gap-3 items-center"
          >
            <div className="flex justify-center">
              <span className="w-7 h-7 flex items-center justify-center rounded-full border border-zinc-800 text-xs text-zinc-400 font-bold">
                {index + 1}
              </span>
            </div>

            <input
              type="text"
              inputMode="decimal"
              placeholder="—"
              value={set.kg}
              onChange={(e) => handleSetChange(set.id, 'kg', e.target.value)}
              className="w-full min-w-0 bg-zinc-900/40 border border-zinc-800 rounded-xl py-2 px-1 sm:px-3 text-center text-sm font-semibold text-white focus:outline-none focus:border-zinc-500 focus:placeholder:text-transparent placeholder-shown:not-open: transition-colors placeholder-zinc-700"
            />

            <input
              type="text"
              inputMode="numeric"
              placeholder="—"
              value={set.reps}
              onChange={(e) => handleSetChange(set.id, 'reps', e.target.value)}
              className="w-full min-w-0 bg-zinc-900/40 border border-zinc-800 rounded-xl py-2 px-1 sm:px-3 text-center text-sm font-semibold text-white focus:outline-none focus:border-zinc-500 focus:placeholder:text-transparent transition-colors placeholder-zinc-700"
            />

            <button
              type="button"
              onClick={() => handleRemoveSet(set.id)}
              className="text-zinc-600 hover:text-red-400 flex justify-center items-center text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={handleAddSet}
        className="text-[10px] font-bold text-zinc-500 hover:text-white transition-colors uppercase tracking-widest self-start mt-2"
      >
        + Add Set
      </button>
    </div>
  );
}
