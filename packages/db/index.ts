import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless";

import * as profile from "./schema/profile";
import * as wordSpelling from "./schema/wordSpelling";

export const schema = { ...wordSpelling, ...profile };

export * from "drizzle-orm";

const connection = connect({
  url: process.env.DATABASE_URL,
});

export const db = drizzle(connection, { schema });
