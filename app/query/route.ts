import { Client } from 'pg';  // Importa el cliente PostgreSQL

const client = new Client({
  connectionString: process.env.POSTGRES_URL,  // Usa la URL de tu base de datos (por ejemplo, postgres://user:password@localhost:5432/dbname)
});

export async function GET() {
  try {
    await client.connect();
    const result = await client.query(`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `);
    client.end();

    return Response.json({ success: true, timestamp: result.rows[0] });
  } catch (error) {
    console.error('Error en la consulta:', error);
    return new Response(
      JSON.stringify({ success: false, message: 'Hubo un error al obtener los datos.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    await client.end();  // Asegúrate de cerrar la conexión
  }
}
