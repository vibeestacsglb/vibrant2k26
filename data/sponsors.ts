import { Sponsor } from "@/lib/types";
import sponsorsData from "./sponsors.json";

export const sponsors: Sponsor[] = sponsorsData as any;

export const sponsorTierOrder: Sponsor["tier"][] = [
  "Title Sponsor",
  "Powered By",
  "Co-Sponsors",
  "Partners",
];
