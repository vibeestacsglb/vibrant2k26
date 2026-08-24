import { GalleryImage } from "@/lib/types";

/**
 * No event photography exists yet — VIBRANT 2K26 hasn't happened.
 * This array is intentionally empty so the gallery page renders its
 * "Coming Soon" state honestly instead of showing fabricated photos.
 *
 * Once real photos are available, add entries like:
 * {
 *   id: "hackathon-01",
 *   src: "/gallery/hackathon-01.jpg",
 *   alt: "Team presenting at the 36-Hour Hackathon",
 *   category: "tech",
 *   caption: "36-Hour Hackathon — Day 1",
 *   aspectRatio: "landscape",
 * }
 */
export const galleryImages: GalleryImage[] = [];

export const galleryFilters: { label: string; value: GalleryImage["category"] | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Tech", value: "tech" },
  { label: "Cultural", value: "cultural" },
  { label: "Performances", value: "performances" },
  { label: "Behind the Scenes", value: "bts" },
];
