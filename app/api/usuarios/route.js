import { NextResponse } from 'next/server';
import { sql } from '@/app/lib/db';

export async function GET() {
  try {
    const result = await sql`SELECT * FROM greetings`;
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}