import { notFound } from "next/navigation";
import { laptops } from "@/lib/data";
import { getLaptopBySlug, getRelatedLaptops } from "@/lib/catalog";
import ProductDetailClient from "./ProductDetailClient";

export function generateStaticParams() {
  // Only the seed catalog is known at build time; admin-added laptops render
  // on demand at request time (Next.js dynamicParams defaults to true).
  return laptops.map((l) => ({ id: l.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const laptop = getLaptopBySlug(id);
  if (!laptop) notFound();
  const related = getRelatedLaptops(laptop);

  return <ProductDetailClient laptop={laptop} related={related} />;
}
