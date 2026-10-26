import LastSevenDaysCard from './components/LastSevenDaysCard';
import WorkoutList from './components/WorkoutList'; // <--- Neu importieren
import { getRecentWorkouts } from '@/lib/supabase/workouts';
import Link from 'next/link';

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
        <Link
          href="/log"
          className="p-5 bg-highlight text-black font-extrabold text-center rounded-2xl w-full"
        >
          + START WORKOUT
        </Link>
        <div>
          <span className="text-secondary text-xs">Recent Workouts</span>
          <WorkoutList initialWorkouts={recentWorkouts || []} />
        </div>
      </div>
    </div>
  );
}
