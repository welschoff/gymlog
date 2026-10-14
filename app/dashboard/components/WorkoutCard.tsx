'use client';
import { Workout } from '@/app/types/workout';

type WorkoutCardProps = Workout & {
  onDelete: () => void;
};

function WorkoutCard({ ...props }: WorkoutCardProps) {
  const formattedDate = new Date(props.started_at).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-card p-3 rounded ring ring-gray-800 flex justify-between items-start">
      <div>
        <span>{props.name}</span>
        <div className="text-secondary text-xs mt-1">
          <span>{formattedDate}</span>
        </div>
      </div>
      <button onClick={() => props.onDelete()}>Löschen</button>
    </div>
  );
}

export default WorkoutCard;
