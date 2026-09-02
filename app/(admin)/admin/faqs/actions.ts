"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logAction } from "../audit/actions";

const dataPath = path.join(process.cwd(), "data", "faq.json");

export async function getFaqs() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (e) {
    return [];
  }
}

export async function addFaq(formData: FormData) {
  const faqs = await getFaqs();
  
  faqs.push({
    id: Date.now().toString(),
    question: formData.get("question"),
    answer: formData.get("answer"),
    category: formData.get("category") || "general"
  });
  
  fs.writeFileSync(dataPath, JSON.stringify(faqs, null, 2));
  await logAction("FAQ Added", "FAQs", `Added FAQ: '${formData.get("question")}'`);
  revalidatePath("/admin/faqs");
  revalidatePath("/#faq");
  redirect("/admin/faqs?success=true");
}

export async function updateFaq(id: string, formData: FormData) {
  const faqs = await getFaqs();
  const index = faqs.findIndex((f: any) => f.id === id);
  if (index !== -1) {
    faqs[index] = {
      ...faqs[index],
      question: formData.get("question"),
      answer: formData.get("answer"),
      category: formData.get("category") || "general"
    };
    fs.writeFileSync(dataPath, JSON.stringify(faqs, null, 2));
    await logAction("FAQ Updated", "FAQs", `Updated FAQ: '${formData.get("question")}'`);
  }
  revalidatePath("/admin/faqs");
  revalidatePath("/#faq");
  redirect("/admin/faqs?success=true");
}

export async function deleteFaq(id: string) {
  let faqs = await getFaqs();
  const deletedFaq = faqs.find((f: any) => f.id === id);
  if (deletedFaq) {
    faqs = faqs.filter((f: any) => f.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(faqs, null, 2));
    await logAction("FAQ Deleted", "FAQs", `Deleted FAQ: '${deletedFaq.question}'`);
  }
  revalidatePath("/admin/faqs");
  revalidatePath("/#faq");
}
