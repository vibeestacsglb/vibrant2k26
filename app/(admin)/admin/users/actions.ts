"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const dataPath = path.join(process.cwd(), "data", "users.json");

export async function getUsers() {
  try {
    const file = fs.readFileSync(dataPath, "utf8");
    return JSON.parse(file);
  } catch (e) {
    return [];
  }
}

export async function addUser(formData: FormData) {
  const users = await getUsers();
  
  const newUser = {
    id: Date.now().toString(),
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    role: formData.get("role"),
    scope: formData.get("scope") || "Global",
    status: "Active",
    lastActive: "Just now",
  };
  
  users.push(newUser);
  
  fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
  await logAction("User Invited", "Users", `Invited user ${newUser.email} as ${newUser.role}`);
  revalidatePath("/admin/users");
  redirect("/admin/users?success=true");
}

export async function deleteUser(id: string) {
  let users = await getUsers();
  const deletedUser = users.find((u: any) => u.id === id);
  if (deletedUser) {
    users = users.filter((u: any) => u.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    await logAction("User Deleted", "Users", `Deleted user ${deletedUser.email}`);
  }
  revalidatePath("/admin/users");
}

export async function updateUser(id: string, formData: FormData) {
  const users = await getUsers();
  const index = users.findIndex((u: any) => u.id === id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      scope: formData.get("scope") || "Global"
    };
    fs.writeFileSync(dataPath, JSON.stringify(users, null, 2));
    await logAction("User Updated", "Users", `Updated roles/details for ${users[index].email}`);
  }
  revalidatePath("/admin/users");
  redirect("/admin/users");
}
