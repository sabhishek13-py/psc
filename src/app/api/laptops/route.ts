import { NextResponse } from "next/server";
import { getAllLaptops } from "@/lib/catalog";

export async function GET() {
  return NextResponse.json({ laptops: getAllLaptops() }, { headers: { "Cache-Control": "no-store" } });
}
