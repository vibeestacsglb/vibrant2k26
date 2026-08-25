import { NextResponse } from "next/server";
import { google } from "googleapis";

const FORM_ID = "1uYX4vDqEPbzwP3BykTyXOkw-e1KVkb-8wDtbFjAJO8E";

export async function GET() {
  try {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/1gCruFkwZk6tKs4KUCi-ntnql3g5xFBcpUBHT77L2cvY/gviz/tq?tqx=out:csv&gid=0";

    const response = await fetch(CSV_URL, { next: { revalidate: 30 } });
    if (!response.ok) {
      throw new Error(`Failed to fetch CSV: ${response.statusText}`);
    }

    const csvText = await response.text();
    const lines = csvText.split(/\r?\n/);
    
    const countMap = new Map<string, number>();

    for (const line of lines) {
      // Split by comma, handling quotes (simplified for this specific sheet)
      // The format is like: "Name","Code","Count",...
      const cols = line.split('","').map(c => c.replace(/^"|"$/g, '').trim());
      
      // Check first group (cols 1 and 2)
      if (cols.length > 2) {
        const code1 = cols[1];
        const count1 = parseInt(cols[2], 10);
        if (code1 && !isNaN(count1) && count1 > 0) {
          countMap.set(code1, Math.max(countMap.get(code1) || 0, count1));
        }
      }

      // Check second group (cols 6 and 7)
      if (cols.length > 7) {
        const code2 = cols[6];
        const count2 = parseInt(cols[7], 10);
        if (code2 && !isNaN(count2) && count2 > 0) {
          countMap.set(code2, Math.max(countMap.get(code2) || 0, count2));
        }
      }
    }

    // Sort and format the top 20
    const leaderboard = Array.from(countMap.entries())
      .map(([referralCode, registrations]) => ({
        referralCode,
        registrations,
      }))
      .sort((a, b) => b.registrations - a.registrations)
      .slice(0, 20)
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
