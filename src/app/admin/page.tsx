import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/session";
import { getOrderStats, getRecentOrders, getPendingOrders, getRevenueByWeek } from "@/lib/orders";
import { getAllLaptops } from "@/lib/catalog";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const stats = getOrderStats();
  const recentOrders = getRecentOrders(8);
  const pendingOrders = getPendingOrders();
  const revenueByWeek = getRevenueByWeek(12);
  const topProducts = getAllLaptops().sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5);

  return (
    <AdminDashboard
      stats={stats}
      recentOrders={recentOrders}
      pendingOrders={pendingOrders}
      revenueByWeek={revenueByWeek}
      topProducts={topProducts}
    />
  );
}
