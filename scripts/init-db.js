const fs = require('fs');
const path = require('path');
const pool = require('../src/db');

async function main() {
  const sql = fs.readFileSync(path.join(__dirname, '..', 'db', 'init.sql'), 'utf8');
  await pool.query(sql);
  console.log('Base de datos inicializada correctamente.');
  await pool.end();
}

main().catch(async (error) => {
  console.error('Error al inicializar la base de datos:', error.message);
  await pool.end();
  process.exit(1);
});
