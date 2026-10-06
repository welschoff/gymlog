type Workout = {
  id: string;
  name: string;
  started_at: string;
  completed_at: string | null;
};

function WorkoutCard({ workout }: { workout: Workout }) {
  const formattedDate = new Date(workout.started_at).toLocaleDateString(
    'de-DE',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    },
  );

  return (
    <div className="bg-card p-3 rounded ring ring-gray-800">
      <div className="flex justify-between">
        <span>{workout.name}</span>
      </div>
      <div className="flex justify-between text-secondary text-xs">
        <span>{formattedDate}</span>
      </div>
    </div>
  );
}

export default WorkoutCard;
