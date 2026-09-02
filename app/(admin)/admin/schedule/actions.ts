"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logAction } from "../audit/actions";

const dataPath = path.join(process.cwd(), "data", "schedule.json");

export async function getSchedule() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (e) {
    return [];
  }
}

export async function addSchedule(formData: FormData) {
  const schedule = await getSchedule();
  
  schedule.push({
    id: Date.now().toString(),
    day: formData.get("day") || "Day 1",
    dateText: formData.get("dateText") || "",
    time: formData.get("time"),
    title: formData.get("title"),
    description: formData.get("description")
  });
  
  fs.writeFileSync(dataPath, JSON.stringify(schedule, null, 2));
  await logAction("Schedule Slot Added", "Schedule", `Added slot '${formData.get("title")}' on ${formData.get("day")}`);
  revalidatePath("/admin/schedule");
  revalidatePath("/");
  revalidatePath("/schedule");
  redirect("/admin/schedule?success=true");
}

export async function updateSchedule(id: string, formData: FormData) {
  const schedule = await getSchedule();
  const index = schedule.findIndex((s: any) => s.id === id);
  if (index !== -1) {
    schedule[index] = {
      ...schedule[index],
      day: formData.get("day") || "Day 1",
      dateText: formData.get("dateText") || "",
      time: formData.get("time"),
      title: formData.get("title"),
      description: formData.get("description")
    };
    fs.writeFileSync(dataPath, JSON.stringify(schedule, null, 2));
    await logAction("Schedule Slot Updated", "Schedule", `Updated slot '${formData.get("title")}'`);
  }
  revalidatePath("/admin/schedule");
  revalidatePath("/");
  revalidatePath("/schedule");
  redirect("/admin/schedule?success=true");
}

export async function deleteSchedule(id: string) {
  let schedule = await getSchedule();
  const deletedSlot = schedule.find((s: any) => s.id === id);
  if (deletedSlot) {
    schedule = schedule.filter((s: any) => s.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(schedule, null, 2));
    await logAction("Schedule Slot Deleted", "Schedule", `Deleted slot '${deletedSlot.title}'`);
  }
  revalidatePath("/admin/schedule");
  revalidatePath("/");
  revalidatePath("/schedule");
}
