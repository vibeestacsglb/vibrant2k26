import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Define the interface for our data
interface Ambassador {
  name: string;
  contact: string;
  branch: string;
  code: string;
  enrolledAt: string;
}

export async function POST(request: Request) {
  try {
    const { name, contact, branch } = await request.json();

    if (!name || !contact || !branch) {
      return NextResponse.json(
        { error: "Name, contact, and branch are required." },
        { status: 400 }
      );
    }

    // Path to our local JSON database
    const dbPath = path.join(process.cwd(), "data", "ambassadors.json");

    // 1. Fetch existing data
    let existingData: Ambassador[] = [];
    try {
      const fileData = await fs.readFile(dbPath, "utf-8");
      existingData = JSON.parse(fileData);
    } catch (e: any) {
      // If file doesn't exist, we start with an empty array.
      // We'll create the directory if it doesn't exist when we write.
      if (e.code !== "ENOENT") {
        console.error("Failed to read from ambassadors.json:", e);
      }
    }

    // 2. Check for duplicates and calculate next ID
    let maxId = 58; // Start at 59 (58 + 1)
    
    for (const ambassador of existingData) {
      // Check if Name and Branch combination already exists
      if (
        ambassador.name.trim().toLowerCase() === name.trim().toLowerCase() &&
        ambassador.branch.trim().toLowerCase() === branch.trim().toLowerCase()
      ) {
        return NextResponse.json(
          { error: "You are already registered for the Campus Ambassador program." },
          { status: 409 } // Conflict
        );
      }

      // Check for CAxxx code to find max
      if (ambassador.code && ambassador.code.startsWith("CA")) {
        const numPart = parseInt(ambassador.code.substring(2), 10);
        if (!isNaN(numPart) && numPart > maxId) {
          maxId = numPart;
        }
      }
    }

    // 3. Generate New Code
    const newCode = `CA${String(maxId + 1).padStart(3, "0")}`;

    // 4. Append New Record
    const newAmbassador: Ambassador = {
      name: name.trim(),
      contact: contact.trim(),
      branch: branch.trim(),
      code: newCode,
      enrolledAt: new Date().toISOString(),
    };

    existingData.push(newAmbassador);

    // Ensure the data directory exists
    await fs.mkdir(path.dirname(dbPath), { recursive: true });
    
    // Write back to the JSON file
    await fs.writeFile(dbPath, JSON.stringify(existingData, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      referralCode: newCode,
    });
  } catch (error: any) {
    console.error("Enrollment error:", error);
    return NextResponse.json(
      { error: "Internal server error during enrollment. Check server logs." },
      { status: 500 }
    );
  }
}
