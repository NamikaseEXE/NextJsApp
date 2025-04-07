import { Pool, QueryResult, QueryResultRow } from 'pg';

// Configuración del Pool de conexiones con PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,  // Usa tu URL de conexión local
});

// Definimos la función sql para que soporte interpolaciones correctamente
export async function sql<T extends QueryResultRow>(
  strings: TemplateStringsArray,
  ...values: any[]
): Promise<QueryResult<T>> {
  // Construye la consulta con $1, $2, $3...
  const text = strings.reduce((acc, str, i) => {
    return acc + str + (i < values.length ? `$${i + 1}` : '');
  }, '');

  try {
    const result = await pool.query<T>(text, values);
    return result;
  } catch (error) {
    console.error('Database query error', error);
    throw new Error('Error executing query');
  }
}

