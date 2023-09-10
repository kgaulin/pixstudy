import { relations } from "drizzle-orm";
import {
  json,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const wordlyWordList = mysqlTable("WordlyWordList", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  archivedAt: timestamp("archivedAt"),
  name: varchar("name", { length: 256 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
});

export const wordlyWordListRelations = relations(
  wordlyWordList,
  ({ many }) => ({
    posts: many(wordlyWord),
  })
);

export const wordlyWord = mysqlTable("WordlyWord", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  name: varchar("name", { length: 256 }).notNull(),
  userId: varchar("userId", { length: 191 }).notNull(),
  wordListId: varchar("wordListId", { length: 191 }).notNull(),
});

export const wordlyWordRelations = relations(wordlyWord, ({ one }) => ({
  author: one(wordlyWordList, {
    fields: [wordlyWord.wordListId],
    references: [wordlyWordList.id],
  }),
}));

type WordlyJsonSettingsType = {
  currentWord: string | null;
  gameWords: string[];
  correctlySpelledWords: string[];
  notCorrectlySpelledWords: string[];
};

export const wordlyGameSetting = mysqlTable("WordlyGameSetting", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  userId: varchar("userId", { length: 191 }).notNull(),
  status: mysqlEnum("status", ["started", "finished"])
    .default("started")
    .notNull(),
  settings: json("settings").$type<WordlyJsonSettingsType>().notNull(),
  wordListId: varchar("wordListId", { length: 191 }).notNull(),
});

export const wordlyGameSettingRelations = relations(
  wordlyGameSetting,
  ({ one }) => ({
    author: one(wordlyWordList, {
      fields: [wordlyGameSetting.wordListId],
      references: [wordlyWordList.id],
    }),
  })
);
