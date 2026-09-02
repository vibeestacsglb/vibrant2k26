"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logAction } from "../audit/actions";

const dataPath = path.join(process.cwd(), "data", "sponsors.json");

export async function getSponsors() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (e) {
    return [];
  }
}

export async function addSponsor(formData: FormData) {
  const sponsors = await getSponsors();
  
  sponsors.push({
    id: Date.now().toString(),
    name: formData.get("name"),
    tier: formData.get("tier"),
    logo: formData.get("logo"),
    url: formData.get("url")
  });
  
  fs.writeFileSync(dataPath, JSON.stringify(sponsors, null, 2));
  await logAction("Sponsor Added", "Sponsors", `Added '${formData.get("name")}' as ${formData.get("tier")} sponsor`);
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
  redirect("/admin/sponsors?success=true");
}

export async function updateSponsor(id: string, formData: FormData) {
  const sponsors = await getSponsors();
  const index = sponsors.findIndex((s: any) => s.id === id);
  if (index !== -1) {
    sponsors[index] = {
      ...sponsors[index],
      name: formData.get("name"),
      tier: formData.get("tier"),
      logo: formData.get("logo"),
      url: formData.get("url")
    };
    fs.writeFileSync(dataPath, JSON.stringify(sponsors, null, 2));
    await logAction("Sponsor Updated", "Sponsors", `Updated sponsor '${formData.get("name")}'`);
  }
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
  redirect("/admin/sponsors?success=true");
}

export async function deleteSponsor(id: string) {
  let sponsors = await getSponsors();
  const deletedSponsor = sponsors.find((s: any) => s.id === id);
  if (deletedSponsor) {
    sponsors = sponsors.filter((s: any) => s.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(sponsors, null, 2));
    await logAction("Sponsor Deleted", "Sponsors", `Deleted sponsor '${deletedSponsor.name}'`);
  }
  revalidatePath("/admin/sponsors");
  revalidatePath("/");
}
