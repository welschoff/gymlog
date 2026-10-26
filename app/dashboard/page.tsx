import LastSevenDaysCard from './components/LastSevenDaysCard';
import WorkoutList from './components/WorkoutList'; // <--- Neu importieren
import { getRecentWorkouts } from '@/lib/supabase/workouts';

export default async function DashboardPage() {
  const recentWorkouts = await getRecentWorkouts();

  return (
    <div>
      <h1 className="text-5xl font-black font-header mb-5">
        YOUR
        <br />
        DASHBOARD
      </h1>
      <div className="flex flex-col gap-5">
        <LastSevenDaysCard />
        <button className="p-5 bg-highlight text-black font-extrabold rounded-2xl w-full">
          + START WORKOUT
        </button>
        <div>
          <span className="text-secondary text-xs">Recent Workouts</span>
          <WorkoutList initialWorkouts={recentWorkouts || []} />
        </div>
      </div>
    </div>
  );
}
