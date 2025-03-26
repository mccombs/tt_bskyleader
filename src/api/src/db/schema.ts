import { text, sqliteTable, integer } from "drizzle-orm/sqlite-core";

export const profileTable = sqliteTable("profile", {
    did: text("did").primaryKey(),
    handle: text("handle").notNull(),
    description: text("description"),
    avatar: text("avatar"),
    followersCount: integer("followers_count"),
});
