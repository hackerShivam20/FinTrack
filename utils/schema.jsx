import { pgTable,serial,varchar,integer,numeric,boolean ,timestamp} from "drizzle-orm/pg-core";
import { text, date } from 'drizzle-orm/sqlite-core';

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

export const Bills = pgTable('bills', {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    amount: numeric('amount').notNull(),
    dueDate: varchar('due_date').notNull(),
    isPaid: boolean('is_paid').notNull().default(false),
    createdAt: timestamp('created_at').notNull().defaultNow()
});