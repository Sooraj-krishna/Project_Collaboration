import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
import { resolve } from "path";

// 🔥 Explicitly load .env
dotenv.config({ path: resolve(__dirname, ".env") });

export default {
  schema: "./lib/schema.ts",           // adjust if you use a different path
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  strict: true,
} satisfies Config;
