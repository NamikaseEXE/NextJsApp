import { Pool, QueryResult, QueryResultRow } from 'pg';

// Configuración del Pool de conexiones con PostgreSQL
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,  // Usa tu URL de conexión local
});

// Definimos la función sql para que soporte interpolaciones correctamente
export async function sql<T extends QueryResultRow>(sql: TemplateStringsArray, ...params: any[]): Promise<QueryResult<T>> {
  const queryString = sql.join('');  // Convierte el TemplateStringArray en una cadena de texto

  try {
    // Ejecuta la consulta con los parámetros proporcionados
    const result = await pool.query<T>(queryString, params);
    return result;
  } catch (error) {
    console.error('Database query error', error);
    throw new Error('Error executing query');
  }
}

