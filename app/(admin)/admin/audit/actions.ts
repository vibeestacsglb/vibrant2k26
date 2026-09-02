"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";

const dataPath = path.join(process.cwd(), "data", "audit.json");

export async function getAuditLogs() {
  try {
    const file = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
}

export async function logAction(action: string, moduleName: string, details: string, user: string = "System User") {
  const logs = await getAuditLogs();
  
  logs.unshift({
    id: Date.now().toString(),
    action,
    module: moduleName,
    details,
    user,
    timestamp: new Date().toISOString(),
  });
  
  // Keep only the last 200 logs to prevent file bloat
  const trimmedLogs = logs.slice(0, 200);
  
  fs.writeFileSync(dataPath, JSON.stringify(trimmedLogs, null, 2));
  revalidatePath("/admin/audit");
}
