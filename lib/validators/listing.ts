import * as z from "zod"

export const listingSchema = z.object({
  name: z.string(),
  type:  z.string(),
  power: z.number().max(1000).min(1),
  tier: z.enum(["BASE", "SACRED", "ANCESTRAL"]),
  stats: z.array(z.object({ name: z.string(), range: z.string() })),
  price: z.string(),
})