# ISUR Productos API

Proyecto didáctico para recorrer de cero a publicación un flujo con Node.js, PostgreSQL, Docker, Docker Compose y GitHub Actions.

## Ejecución local

```bash
docker compose up --build -d
docker compose ps
```

Pruebas rápidas:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/productos
```

Crear producto:

```bash
curl -X POST http://localhost:3000/productos \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Monitor 24","precio":599.90,"stock":8}'
```

Detener:

```bash
docker compose down
```

Eliminar también la base persistida:

```bash
docker compose down -v
```
