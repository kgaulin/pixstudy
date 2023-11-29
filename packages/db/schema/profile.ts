import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core";

export const profile = mysqlTable("Profiles", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  color: varchar("color", { length: 256 }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
});
