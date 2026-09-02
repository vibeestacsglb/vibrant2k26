"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const dataPath = path.join(process.cwd(), "data", "settings.json");

export async function getSettings() {
  try {
    const file = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(file);
  } catch (e) {
    return {
      eventName: "VIBRANT 2K26",
      tagline: "INNOVATE. IMPACT. IDEAS.",
      datesLabel: "16 & 17 October 2026",
      venue: "G.L. Bajaj Institute of Technology & Management",
      registrationUrl: "",
      instagramUrl: "",
      linkedinUrl: "",
    };
  }
}

export async function saveSettings(formData: FormData) {
  const settings = {
    eventName: formData.get("eventName") || "VIBRANT 2K26",
    tagline: formData.get("tagline") || "",
    datesLabel: formData.get("datesLabel") || "",
    venue: formData.get("venue") || "",
    registrationUrl: formData.get("registrationUrl") || "",
    instagramUrl: formData.get("instagramUrl") || "",
    linkedinUrl: formData.get("linkedinUrl") || "",
  };
  
  fs.writeFileSync(dataPath, JSON.stringify(settings, null, 2));
  
  revalidatePath("/");
  redirect("/admin/settings?success=true");
}
