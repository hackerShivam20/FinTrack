// app/api/bills/route.js
import { NextResponse } from 'next/server';
import { db } from '@/utils/dbConfig';
import { Bills } from '@/utils/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  try {
    const allBills = await db.select().from(Bills);
    return NextResponse.json(allBills);
  } catch (error) {
    console.error('Failed to fetch bills:', error);
    return NextResponse.json({ error: 'Failed to fetch bills' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    // Remove createdAt from body if it's being sent from the client
    const { createdAt, ...billData } = body;
    const newBill = await db.insert(Bills).values(billData).returning();
    return NextResponse.json(newBill[0]);
  } catch (error) {
    console.error('Failed to create bill:', error);
    return NextResponse.json({ error: 'Failed to create bill' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const updatedBill = await db.update(Bills)
      .set({ 
        name: body.name,
        amount: body.amount,
        dueDate: body.dueDate,
        isPaid: body.isPaid
      })
      .where(eq(Bills.id, body.id))
      .returning();
    return NextResponse.json(updatedBill[0]);
  } catch (error) {
    console.error('Failed to update bill:', error);
    return NextResponse.json({ error: 'Failed to update bill' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'Bill ID is required' }, { status: 400 });
    }
    await db.delete(Bills).where(eq(Bills.id, parseInt(id)));
    return NextResponse.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Failed to delete bill:', error);
    return NextResponse.json({ error: 'Failed to delete bill' }, { status: 500 });
  }
}