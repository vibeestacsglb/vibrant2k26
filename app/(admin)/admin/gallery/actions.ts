"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logAction } from "../audit/actions";

const dataPath = path.join(process.cwd(), "data", "gallery.json");

export async function getGallery() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (e) {
    return [];
  }
}

export async function addRandomImage(category: string) {
  const gallery = await getGallery();
  const id = Math.random().toString(36).substring(7);
  
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const newImage = {
    id: Date.now().toString(),
    src: `https://picsum.photos/seed/${randomId}/600/600`,
    alt: `${category} photo`,
    category: category,
  };
  
  gallery.unshift(newImage); // add to front
  
  fs.writeFileSync(dataPath, JSON.stringify(gallery, null, 2));
  await logAction("Gallery Upload", "Gallery", `Uploaded new image to '${category}'`);
  revalidatePath("/admin/gallery");
  revalidatePath("/");
  redirect(`/admin/gallery?filter=${category}&success=true`);
}

export async function deleteImage(id: string) {
  let gallery = await getGallery();
  const deletedImage = gallery.find((g: any) => g.id === id);
  if (deletedImage) {
    gallery = gallery.filter((g: any) => g.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(gallery, null, 2));
    await logAction("Gallery Image Deleted", "Gallery", `Deleted image from '${deletedImage.category}'`);
  }
  revalidatePath("/admin/gallery");
  revalidatePath("/");
}
