import { Sponsor } from "@/lib/types";

/**
 * No sponsors have been confirmed yet. Add entries here as they are
 * signed — the Sponsors section renders nothing (not placeholders)
 * until at least one sponsor exists, per tier.
 *
 * Example once confirmed:
 * { id: "acme", name: "Acme Corp", tier: "Title Sponsor", logo: "/sponsors/acme.png" }
 */
export const sponsors: Sponsor[] = [];

export const sponsorTierOrder: Sponsor["tier"][] = [
  "Title Sponsor",
  "Powered By",
  "Co-Sponsors",
  "Partners",
];
