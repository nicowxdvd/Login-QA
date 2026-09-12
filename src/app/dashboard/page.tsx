import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_COOKIE_NAME } from "@/app/api/login/route";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ProgressCard from "@/components/dashboard/ProgressCard";
import ResultsChart from "@/components/dashboard/ResultsChart";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsGrid from "@/components/dashboard/StatsGrid";
import TrendCard from "@/components/dashboard/TrendCard";

/**
 * Authenticated landing page shown after a successful login. Layout only:
 * all figures are static placeholders.
 */
export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME);

  if (!token) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-neutral-950 text-white">
      <Sidebar />

      <main className="flex-1 space-y-6 px-6 py-8 sm:px-10 lg:px-12">
        <DashboardHeader />
        <StatsGrid />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ResultsChart />
          <ProgressCard />
          <TrendCard />
        </div>
      </main>
    </div>
  );
}
