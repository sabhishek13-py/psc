import { redirect } from "next/navigation";
import { getCustomerSession } from "@/lib/customer-session";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const user = await getCustomerSession();
  if (!user) {
    redirect("/login?next=/demo-dashboard");
  }

  return <DashboardClient user={user} />;
}
