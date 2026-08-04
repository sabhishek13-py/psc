import { redirect } from "next/navigation";
import { isAdminAuthed } from "@/lib/session";
import { getAllLaptops } from "@/lib/catalog";
import InventoryClient from "./InventoryClient";

export default async function AdminInventoryPage() {
  if (!(await isAdminAuthed())) {
    redirect("/admin/login");
  }

  const laptops = getAllLaptops();

  return <InventoryClient laptops={laptops} />;
}
