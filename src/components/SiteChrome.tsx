"use client";

import { usePathname } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import type { CustomerProfile } from "@/lib/customer-token";

export default function SiteChrome({
  children,
  user,
}: {
  children: React.ReactNode;
  user: CustomerProfile | null;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Nav user={user} />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
