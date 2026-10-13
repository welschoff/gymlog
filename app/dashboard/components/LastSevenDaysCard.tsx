import DayCard from './DayCard';
import { getLastSevenDaysWorkouts } from '@/lib/supabase/workouts';

const DAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

async function LastSevenDaysCard() {
  const today = new Date();
  const workouts = await getLastSevenDaysWorkouts();

  const hasWorkoutOnDate = (date: Date) => {
    return workouts.some((workout) => {
      const workoutDate = new Date(workout.completed_at);
      return (
        workoutDate.getDate() === date.getDate() &&
        workoutDate.getMonth() === date.getMonth() &&
        workoutDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() - (6 - i));

    return {
      date: d,
      label: DAY_LABELS[d.getDay()],
      isToday: i === 6,
      isWorkoutDay: hasWorkoutOnDate(d),
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
            isWorkoutDay={item.isWorkoutDay}
          />
        ))}
      </div>
    </div>
  );
}

export default LastSevenDaysCard;
