import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import LastSevenDaysCard from './components/LastSevenDaysCard';
import WorkoutCard from './components/WorkoutCard';
export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

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
          <WorkoutCard />
        </div>
      </div>
    </div>
  );
}
