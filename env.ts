import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
 
export const env = createEnv({
  server: {
    BATTLENET_CLIENT_ID: z.string().min(1),
    BATTLENET_CLIENT_SECRET: z.string().min(1),
  },
  runtimeEnv: {
    BATTLENET_CLIENT_ID: process.env.BATTLENET_CLIENT_ID,
    BATTLENET_CLIENT_SECRET: process.env.BATTLENET_CLIENT_SECRET,
  },
});