type Workout = {
  id: string;
  name: string;
  started_at: string;
  completed_at: string | null;
};

async function WorkoutCard({ workout }: { workout: Workout }) {
  const formattedDate = new Date(workout.started_at).toLocaleDateString(
    'de-DE',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  );

  return (
    <div className="bg-card p-3 rounded ring ring-gray-800 flex justify-between items-start">
      <div>
        <span>{workout.name}</span>
        <div className="text-secondary text-xs mt-1">
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}

export default WorkoutCard;
