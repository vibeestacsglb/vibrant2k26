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

    const inputName = name.trim().toLowerCase();
    const inputBranch = branch.trim().toLowerCase();

    // Paths to our local databases
    const dbPath = path.join(process.cwd(), "data", "ambassadors.json");
    const legacyCsvPath = path.join(process.cwd(), "data", "legacy_ambassadors.csv");

    let maxId = 58; // Start at 59 (58 + 1)
    let duplicateCode = "";

    // 1. Fetch existing JSON data
    let existingData: Ambassador[] = [];
    try {
      const fileData = await fs.readFile(dbPath, "utf-8");
      existingData = JSON.parse(fileData);
    } catch (e: any) {
      if (e.code !== "ENOENT") {
        console.error("Failed to read from ambassadors.json:", e);
      }
    }

    // Check JSON for duplicates and maxId
    for (const ambassador of existingData) {
      if (
        ambassador.name.trim().toLowerCase() === inputName &&
        ambassador.branch.trim().toLowerCase() === inputBranch
      ) {
        duplicateCode = ambassador.code;
      }
      if (ambassador.code && ambassador.code.startsWith("CA")) {
        const numPart = parseInt(ambassador.code.substring(2), 10);
        if (!isNaN(numPart) && numPart > maxId) {
          maxId = numPart;
        }
      }
    }

    // 2. Fetch legacy CSV data
    try {
      const csvData = await fs.readFile(legacyCsvPath, "utf-8");
      const lines = csvData.split(/\r?\n/);
      
      for (const line of lines) {
        if (!line.trim() || line.startsWith("FULL NAME")) continue;
        
        // CSV format: "Naman Verma ,CA001"
        const parts = line.split(",");
        if (parts.length >= 2) {
          const csvName = parts[0].trim().toLowerCase();
          const csvCode = parts[1].trim();

          // In CSV we only have Name, so we match on Name
          if (csvName === inputName) {
            duplicateCode = csvCode;
          }

          if (csvCode && csvCode.startsWith("CA")) {
            const numPart = parseInt(csvCode.substring(2), 10);
            if (!isNaN(numPart) && numPart > maxId) {
              maxId = numPart;
            }
          }
        }
      }
    } catch (e: any) {
      if (e.code !== "ENOENT") {
        console.error("Failed to read from legacy_ambassadors.csv:", e);
      }
    }

    // 3. Return error if duplicate found
    if (duplicateCode) {
      return NextResponse.json(
        { error: `You are already registered for the Campus Ambassador program. Your existing code is ${duplicateCode}.` },
        { status: 409 } // Conflict
      );
    }

    // 4. Generate New Code
    const newCode = `CA${String(maxId + 1).padStart(3, "0")}`;

    // 5. Append New Record to JSON
    const newAmbassador: Ambassador = {
      name: name.trim(),
      contact: contact.trim(),
      branch: branch.trim(),
      code: newCode,
      enrolledAt: new Date().toISOString(),
    };

    existingData.push(newAmbassador);

    await fs.mkdir(path.dirname(dbPath), { recursive: true });
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
