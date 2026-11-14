CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  precio NUMERIC(10,2) NOT NULL CHECK (precio >= 0),
  stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  creado_en TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos(nombre, precio, stock)
SELECT 'Teclado mecánico', 189.90, 10
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Teclado mecánico');

INSERT INTO productos(nombre, precio, stock)
SELECT 'Mouse inalámbrico', 79.90, 25
WHERE NOT EXISTS (SELECT 1 FROM productos WHERE nombre = 'Mouse inalámbrico');
