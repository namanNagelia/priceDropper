import {
  pgTable,
  foreignKey,
  integer,
  varchar,
  jsonb,
  timestamp,
  boolean,
  unique,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const itemsTable = pgTable(
  "items",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({
      name: "items_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    name: varchar({ length: 255 }).notNull(),
    linksPrice: jsonb("links_price").notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
    links: varchar({ length: 255 }).array().notNull(),
    active: boolean().default(true).notNull(),
    userId: integer("user_id"),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [usersTable.id],
      name: "items_user_id_users_id_fk",
    }),
  ]
);

export const usersTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity({
      name: "users_id_seq",
      startWith: 1,
      increment: 1,
      minValue: 1,
      maxValue: 2147483647,
      cache: 1,
    }),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at", { mode: "string" }).defaultNow(),
    updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow(),
    password: varchar({ length: 255 }).notNull(),
    remainingTokens: integer("remaining_tokens").default(5).notNull(),
  },
  (table) => [unique("users_email_unique").on(table.email)]
);
