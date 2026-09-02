"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const dataPath = path.join(process.cwd(), "data", "events.json");

export async function getEvents() {
  try {
    const file = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(file);
  } catch (e) {
    // Fallback if events.json doesn't exist yet
    return [];
  }
}

import { redirect } from "next/navigation";
import { logAction } from "../audit/actions";

export async function addEvent(formData: FormData) {
  const events = await getEvents();
  
  const newEvent = {
    id: formData.get("name")?.toString().toLowerCase().replace(/\s+/g, '-') || Date.now().toString(),
    number: (events.length + 1).toString().padStart(2, '0'),
    name: formData.get("name"),
    category: formData.get("category"),
    date: formData.get("date"),
    time: formData.get("time"),
    teamSize: formData.get("teamSize"),
    venue: formData.get("venue"),
    fee: formData.get("fee"),
    prize: formData.get("prize"),
    eligibility: formData.get("eligibility"),
    rules: formData.get("rules"),
    coordinators: formData.get("coordinators"),
    status: formData.get("status") || "Draft",
  };
  
  events.push(newEvent);
  
  fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
  await logAction("Event Created", "Events", `Created event '${newEvent.name}'`);
  
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
  redirect("/admin/events?success=true");
}

export async function updateEvent(id: string, formData: FormData) {
  const events = await getEvents();
  const index = events.findIndex((e: any) => e.id === id);
  if (index !== -1) {
    events[index] = {
      ...events[index],
      name: formData.get("name"),
      category: formData.get("category"),
      date: formData.get("date"),
      time: formData.get("time"),
      teamSize: formData.get("teamSize"),
      venue: formData.get("venue"),
      fee: formData.get("fee"),
      prize: formData.get("prize"),
      eligibility: formData.get("eligibility"),
      rules: formData.get("rules"),
      coordinators: formData.get("coordinators"),
      status: formData.get("status") || "Draft",
    };
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
    await logAction("Event Updated", "Events", `Updated event '${events[index].name}'`);
  }
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
  redirect("/admin/events?success=true");
}

export async function deleteEvent(id: string) {
  let events = await getEvents();
  const deletedEvent = events.find((e: any) => e.id === id);
  if (deletedEvent) {
    events = events.filter((e: any) => e.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(events, null, 2));
    await logAction("Event Deleted", "Events", `Deleted event '${deletedEvent.name}'`);
  }
  revalidatePath("/admin/events");
  revalidatePath("/");
  revalidatePath("/events");
}
