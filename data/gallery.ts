import { GalleryImage } from "@/lib/types";
import galleryData from "./gallery.json";

export const galleryImages: GalleryImage[] = galleryData as any;

export const galleryFilters: { label: string; value: GalleryImage["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Hackathon", value: "Hackathon" },
  { label: "Performances", value: "Performances" },
  { label: "Crowd", value: "Crowd" }
];
