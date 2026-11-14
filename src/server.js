const express = require('express');
const pool = require('./db');

const app = express();
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'error', database: 'disconnected' });
  }
});

app.get('/productos', async (_req, res) => {
  const result = await pool.query(
    'SELECT id, nombre, precio, stock, creado_en FROM productos ORDER BY id'
  );
  res.json(result.rows);
});

app.post('/productos', async (req, res) => {
  const { nombre, precio, stock } = req.body;
  if (!nombre || precio === undefined || stock === undefined) {
    return res.status(400).json({ error: 'nombre, precio y stock son obligatorios' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO productos(nombre, precio, stock)
       VALUES ($1, $2, $3)
       RETURNING id, nombre, precio, stock, creado_en`,
      [nombre, precio, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, '0.0.0.0', () => {
  console.log(`API escuchando en puerto ${port}`);
});
