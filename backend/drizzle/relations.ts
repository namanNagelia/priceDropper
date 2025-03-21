import { relations } from "drizzle-orm/relations";
import { users, items } from "./schema";

export const itemsRelations = relations(items, ({one}) => ({
	user: one(users, {
		fields: [items.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	items: many(items),
}));