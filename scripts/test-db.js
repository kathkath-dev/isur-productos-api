const pool = require('../src/db');

async function main() {
  const ping = await pool.query('SELECT 1 AS ok');
  if (ping.rows[0].ok !== 1) throw new Error('La base de datos no responde.');

  const table = await pool.query("SELECT to_regclass('public.productos') AS tabla");
  if (table.rows[0].tabla !== 'productos') throw new Error('La tabla productos no existe.');

  await pool.query('BEGIN');
  try {
    const inserted = await pool.query(
      `INSERT INTO productos(nombre, precio, stock)
       VALUES ($1, $2, $3) RETURNING id`,
      ['Producto CI', 25.50, 3]
    );
    if (!inserted.rows[0].id) throw new Error('No se pudo insertar el producto de prueba.');
    await pool.query('ROLLBACK');
  } catch (error) {
    await pool.query('ROLLBACK');
    throw error;
  }

  console.log('Pruebas de integración con PostgreSQL: OK');
  await pool.end();
}

main().catch(async (error) => {
  console.error('Prueba fallida:', error.message);
  await pool.end();
  process.exit(1);
});
