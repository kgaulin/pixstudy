import { relations } from "drizzle-orm";
import {
  json,
  mysqlEnum,
  mysqlTable,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const wordSpellingList = mysqlTable("WordSpellingList", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  archivedAt: timestamp("archivedAt"),
  name: varchar("name", { length: 256 }).notNull(),
  profileId: varchar("profileId", { length: 191 }).notNull(),
});

export const wordSpellingListRelations = relations(
  wordSpellingList,
  ({ many }) => ({
    words: many(wordSpellingWord),
  }),
);

export const wordSpellingWord = mysqlTable("WordSpellingWord", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  name: varchar("name", { length: 256 }).notNull(),
  profileId: varchar("profileId", { length: 191 }).notNull(),
  wordSpellingListId: varchar("wordSpellingListId", { length: 191 }).notNull(),
});

export const wordSpellingWordRelations = relations(
  wordSpellingWord,
  ({ one }) => ({
    wordList: one(wordSpellingList, {
      fields: [wordSpellingWord.wordSpellingListId],
      references: [wordSpellingList.id],
    }),
  }),
);

interface WordSpellingJsonSettingsType {
  currentWord: string | null;
  gameWords: string[];
  correctlySpelledWords: string[];
  notCorrectlySpelledWords: string[];
}

export const wordSpellingGameSetting = mysqlTable("WordSpellingGameSetting", {
  id: varchar("id", { length: 191 }).primaryKey(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().onUpdateNow(),
  profileId: varchar("profileId", { length: 191 }).notNull(),
  status: mysqlEnum("status", ["started", "finished"])
    .default("started")
    .notNull(),
  settings: json("settings").$type<WordSpellingJsonSettingsType>().notNull(),
  wordSpellingListId: varchar("wordListId", { length: 191 }).notNull(),
});

export const wordSpellingGameSettingRelations = relations(
  wordSpellingGameSetting,
  ({ one }) => ({
    wordSpellingList: one(wordSpellingList, {
      fields: [wordSpellingGameSetting.wordSpellingListId],
      references: [wordSpellingList.id],
    }),
  }),
);
