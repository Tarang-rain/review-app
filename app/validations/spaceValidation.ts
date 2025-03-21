import {  z } from "zod";

const requiredField = z.object({ enabled: z.boolean(), required: z.boolean() });

export const spaceSchema = z.object({
  questions: z.array(z.string().trim().nonempty()).min(1),
  headerTitle: z.string().trim().nonempty(),
  customMessage: z.string().optional(),
  spaceName: z.string().trim().nonempty(),
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
