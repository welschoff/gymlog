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

  const { data: recentWorkouts } = await supabase
    .from('workouts')
    .select('id, name, started_at, completed_at')
    .eq('user_id', user.id)
    .order('started_at', { ascending: false })
    .limit(5);

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
          <div className="flex flex-col gap-3 mt-2">
            {recentWorkouts && recentWorkouts.length > 0 ? (
              recentWorkouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))
            ) : (
              <p className="text-secondary text-sm mt-2">
                No workouts done, yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
