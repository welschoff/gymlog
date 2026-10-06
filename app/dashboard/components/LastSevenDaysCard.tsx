import DayCard from './DayCard';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function LastSevenDaysCard() {
  const today = new Date();

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();

    d.setDate(today.getDate() - (6 - i));

    return {
      date: d,
      label: DAY_LABELS[d.getDay()],
      isToday: i === 6,
    };
  });

  return (
    <div className="flex p-2 flex-col gap-2 text-secondary text-xs bg-card rounded ring ring-gray-800">
      <span>Last 7 Days</span>
      <div className="flex justify-between">
        {last7Days.map((item) => (
          <DayCard
            key={item.date.toISOString()}
            day={item.label}
            isToday={item.isToday}
            isWorkoutDay
          />
        ))}
      </div>
    </div>
  );
}

export default LastSevenDaysCard;
