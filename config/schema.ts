import { integer, json, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  credits: integer(),
});

export const sessionChatTable = pgTable("sessionChat", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  sessionId: varchar().notNull(),
  notes: text().notNull(),
  conversation: json(),
  report: json(),
  createdBy: varchar().notNull(),
  createdAt: timestamp().notNull(),
  selectedDoctor: varchar().notNull()
})