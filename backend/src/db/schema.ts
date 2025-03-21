import {
  integer,
  pgTable,
  varchar,
  timestamp,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  password: varchar({ length: 255 }).notNull(),
  remaining_tokens: integer().notNull().default(5),
});

export const productsTable = pgTable("items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  links_price: jsonb().notNull(),
  links: varchar({ length: 255 }).array().notNull(),
  active: boolean().notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
