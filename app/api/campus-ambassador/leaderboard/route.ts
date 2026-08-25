import { NextResponse } from "next/server";
import { google } from "googleapis";

const FORM_ID = "1uYX4vDqEPbzwP3BykTyXOkw-e1KVkb-8wDtbFjAJO8E";

export async function GET() {
  try {
    const gasUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

    if (!gasUrl) {
      console.warn("Missing GOOGLE_APPS_SCRIPT_URL. Returning mock data for development.");
      return NextResponse.json({
        updatedAt: new Date().toISOString(),
        leaderboard: [
          { rank: 1, referralCode: "VIBE2026", registrations: 45 },
          { rank: 2, referralCode: "AMBASSADOR-X", registrations: 38 },
          { rank: 3, referralCode: "TECHFEST26", registrations: 31 },
          { rank: 4, referralCode: "CAMPUS-PRO", registrations: 27 },
          { rank: 5, referralCode: "INNOVATE", registrations: 19 },
          { rank: 6, referralCode: "PIONEER", registrations: 14 },
          { rank: 7, referralCode: "NEXUS", registrations: 11 },
        ],
      });
    }

    const response = await fetch(gasUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch from GAS: ${response.statusText}`);
    }

    // The GAS script returns an object like: { "CODE1": 5, "CODE2": 2 }
    const counts = await response.json();

    if (counts.error) {
      throw new Error(`GAS Error: ${counts.error}`);
    }

    // Sort and format the top 10
    const leaderboard = Object.entries(counts)
      .map(([referralCode, registrations]) => ({
        referralCode,
        registrations: registrations as number,
      }))
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, 10)
      .map((entry, index) => ({
        rank: index + 1,
        ...entry,
      }));

    return NextResponse.json({
      updatedAt: new Date().toISOString(),
      leaderboard,
    });
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data." },
      { status: 500 }
    );
  }
}
