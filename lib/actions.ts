"use server";

import { signIn, signOut } from "./auth";
import { boolean, z } from "zod";

export async function login() {
  await signIn("google", { redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

const requiredField = z.object({ enabled: z.boolean(), required: z.boolean() });

export const spaceSchema = z.object({
  questions: z.array(z.string()).min(1),
  headerTitle: z.string(),
  customMessage: z.string().optional(),
  spaceName: z.string(),
  requiredFields: z.record(
    z.enum(["name", "email", "socialLink", "address"]),
    requiredField
  ),
  selectedCollectionType: z.enum(["Text Only", "Video Only", "Text And Video"]),
  ratings: z.boolean(),
  isDark: z.boolean(),
  buttonColor: z
    .string()
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .or(z.enum(["white", "black"])),
  squareProfile: z.boolean(),
  imageUri: z.string().optional().nullable(),
});
