"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const dataPath = path.join(process.cwd(), "data", "roles.json");

export async function getRoles() {
  try {
    return JSON.parse(fs.readFileSync(dataPath, "utf8"));
  } catch (e) {
    return [];
  }
}

import { redirect } from "next/navigation";
import { logAction } from "../audit/actions";

export async function addRole(formData: FormData) {
  const roles = await getRoles();
  
  // Extract all permissions (keys starting with 'perm_')
  const permissions = [];
  for (const [key, value] of formData.entries()) {
    if (key.startsWith('perm_') && value === 'on') {
      permissions.push(key.replace('perm_', ''));
    }
  }
  
  const roleName = formData.get("name");
  roles.push({
    id: Date.now().toString(),
    name: roleName,
    description: formData.get("description"),
    permissions
  });
  
  fs.writeFileSync(dataPath, JSON.stringify(roles, null, 2));
  await logAction("Role Created", "Roles", `Created new role '${roleName}'`);
  revalidatePath("/admin/roles");
  redirect("/admin/roles?success=true");
}

export async function updateRole(id: string, formData: FormData) {
  const roles = await getRoles();
  const index = roles.findIndex((r: any) => r.id === id);
  
  if (index !== -1) {
    const permissions = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('perm_') && value === 'on') {
        permissions.push(key.replace('perm_', ''));
      }
    }
    
    roles[index] = {
      ...roles[index],
      name: formData.get("name"),
      description: formData.get("description"),
      permissions
    };
    fs.writeFileSync(dataPath, JSON.stringify(roles, null, 2));
    await logAction("Role Updated", "Roles", `Updated role '${roles[index].name}'`);
  }
  
  revalidatePath("/admin/roles");
  redirect("/admin/roles?success=true");
}

export async function deleteRole(id: string) {
  let roles = await getRoles();
  const deletedRole = roles.find((r: any) => r.id === id);
  if (deletedRole) {
    roles = roles.filter((r: any) => r.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(roles, null, 2));
    await logAction("Role Deleted", "Roles", `Deleted role '${deletedRole.name}'`);
  }
  revalidatePath("/admin/roles");
}
