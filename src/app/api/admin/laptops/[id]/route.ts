import { NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/session";
import { deleteLaptop } from "@/lib/catalog";

export async function DELETE(_request: Request, ctx: RouteContext<"/api/admin/laptops/[id]">) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await ctx.params;
  deleteLaptop(id);
  return NextResponse.json({ ok: true });
}
