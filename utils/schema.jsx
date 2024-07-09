import { pgTable,serial,varchar,integer,numeric } from "drizzle-orm/pg-core";

export const Budgets=pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:varchar('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('created_by').notNull(),
})

export const Expenses=pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:numeric('amount').notNull().default(0),
    budgetId:integer('budgetId').references(()=>Budgets.id),
    createdAt:varchar('created_at').notNull(),
})