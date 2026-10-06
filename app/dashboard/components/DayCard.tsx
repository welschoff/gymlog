type DayCardProps = {
  day: string;
  isToday: boolean;
  isWorkoutDay: boolean;
};

function DayCard({ day, isWorkoutDay }: DayCardProps) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${isWorkoutDay ? 'bg-highlight' : 'bg-amber-50'} w-10 h-8 rounded `}
      />
      <span>{day}</span>
    </div>
  );
}

export default DayCard;
