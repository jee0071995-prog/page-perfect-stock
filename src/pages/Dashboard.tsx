import { MainLayout } from "@/components/layout/MainLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";
import { StockChart } from "@/components/dashboard/StockChart";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Package,
  RotateCcw,
} from "lucide-react";

const Dashboard = () => {
  return (
    <MainLayout title="Dashboard" subtitle="Overview of your book stock">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Books Inward"
          value="2,847"
          change="+12.5% from last month"
          changeType="positive"
          icon={ArrowDownToLine}
          iconBgClass="bg-success/10"
        />
        <StatCard
          title="Total Books Outward"
          value="2,156"
          change="+8.2% from last month"
          changeType="positive"
          icon={ArrowUpFromLine}
          iconBgClass="bg-primary/10"
        />
        <StatCard
          title="Available Stock"
          value="691"
          change="Current inventory"
          changeType="neutral"
          icon={Package}
          iconBgClass="bg-chart-4/10"
        />
        <StatCard
          title="Pending Returns"
          value="45"
          change="-5 from last week"
          changeType="negative"
          icon={RotateCcw}
          iconBgClass="bg-warning/10"
        />
      </div>

      {/* Charts and Tables */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <StockChart />
        <RecentTransactions />
      </div>
    </MainLayout>
  );
};

export default Dashboard;
