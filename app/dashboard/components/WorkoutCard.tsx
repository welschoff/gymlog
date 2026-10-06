function WorkoutCard() {
  return (
    <div className="bg-card p-3 rounded ring ring-gray-800">
      <div className="flex justify-between">
        <span>Push Day A</span>
        <span className="text-highlight">3.7k kg</span>
      </div>
      <div className="flex justify-between text-secondary text-xs">
        <span>Yesterday</span>
        <span>1h 2m</span>
      </div>
    </div>
  );
}

export default WorkoutCard;
