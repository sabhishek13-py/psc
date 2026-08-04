import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { isAdminAuthed } from "@/lib/session";
import { addLaptop, type NewLaptopInput } from "@/lib/catalog";
import type { Laptop } from "@/lib/data";

const CATEGORIES: Laptop["category"][] = ["Ultrabook", "Workstation", "2-in-1", "Creator", "Gaming"];
const GRADES: Laptop["grade"][] = ["A+", "A", "B+", "B"];

function str(formData: FormData, key: string) {
  const v = formData.get(key);
  return typeof v === "string" ? v.trim() : "";
}

function num(formData: FormData, key: string) {
  const v = Number(formData.get(key));
  return Number.isFinite(v) ? v : NaN;
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthed())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();

  const brand = str(formData, "brand");
  const model = str(formData, "model");
  const tagline = str(formData, "tagline");
  const description = str(formData, "description");
  const category = str(formData, "category") as Laptop["category"];
  const grade = str(formData, "grade") as Laptop["grade"];
  const cpu = str(formData, "cpu");
  const ram = str(formData, "ram");
  const storage = str(formData, "storage");
  const gpu = str(formData, "gpu");
  const display = str(formData, "display");
  const battery = str(formData, "battery");
  const weight = str(formData, "weight");
  const price = num(formData, "price");
  const originalPrice = num(formData, "originalPrice");
  const conditionScore = num(formData, "conditionScore");
  const warrantyMonths = num(formData, "warrantyMonths");

  const missing: string[] = [];
  if (!brand) missing.push("brand");
  if (!model) missing.push("model");
  if (!tagline) missing.push("tagline");
  if (!CATEGORIES.includes(category)) missing.push("category");
  if (!GRADES.includes(grade)) missing.push("grade");
  if (!cpu) missing.push("cpu");
  if (!ram) missing.push("ram");
  if (!storage) missing.push("storage");
  if (!display) missing.push("display");
  if (!Number.isFinite(price) || price <= 0) missing.push("price");
  if (!Number.isFinite(originalPrice) || originalPrice <= 0) missing.push("originalPrice");
  if (!Number.isFinite(conditionScore) || conditionScore < 0 || conditionScore > 100) missing.push("conditionScore");

  if (missing.length > 0) {
    return NextResponse.json({ error: `Missing or invalid fields: ${missing.join(", ")}` }, { status: 400 });
  }

  const id = `c-${randomUUID()}`;
  const photoFiles = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);

  const photoPaths: string[] = [];
  if (photoFiles.length > 0) {
    const uploadDir = path.join(process.cwd(), "public", "uploads", id);
    await fs.mkdir(uploadDir, { recursive: true });

    for (const [i, file] of photoFiles.entries()) {
      if (!file.type.startsWith("image/")) continue;
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
      const filename = `photo-${i}.${ext}`;
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(path.join(uploadDir, filename), buffer);
      photoPaths.push(`/uploads/${id}/${filename}`);
    }
  }

  const input: NewLaptopInput = {
    id,
    brand,
    model,
    tagline,
    description,
    category,
    price,
    originalPrice,
    grade,
    conditionScore,
    cpu,
    ram,
    storage,
    gpu,
    display,
    battery,
    weight,
    warrantyMonths: Number.isFinite(warrantyMonths) && warrantyMonths > 0 ? warrantyMonths : 12,
    photoPaths,
  };

  const laptop = addLaptop(input);
  return NextResponse.json({ laptop }, { status: 201 });
}
