import { NextResponse } from 'next/server';
import { sql } from '@/app/lib/db';  // Importa el cliente PostgreSQL

export async function GET() {
  try {
    // Realiza una consulta a la base de datos
    const res = await sql`SELECT greeting FROM greetings WHERE id = 1`;
    const greeting = res.rows[0]?.greeting;  // Obtén el valor del saludo

    // Devuelve la respuesta en formato JSON
    return NextResponse.json({ greeting });
  } catch (error) {
    console.error('Error conectando a la base de datos', error);
    return NextResponse.json({ error: 'Error al obtener el saludo' }, { status: 500 });
  }
}
