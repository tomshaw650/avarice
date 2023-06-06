import * as z from "zod"

export const userSchema = z.object({
  battletag: z.string().min(3).max(32),
  region: z.enum(["EU", "NA", "ASIA"]),
})