import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  breakpoints: true,
  driver: "mysql2",
  dbCredentials: {
    connectionString: `mysql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}/wordly?ssl={"rejectUnauthorized":true}`,
  },
} satisfies Config;
