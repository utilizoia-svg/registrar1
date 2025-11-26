# Registrar1 - Mini backend para registrar

Repositorio con un backend Node.js + Express y MongoDB para probar endpoints de registro.

Cómo usarlo localmente:

1. Instalar dependencias:

```powershell
cd registrar1
npm install
```

2. Configurar variables de entorno: copia `.env.example` a `.env` y cambia `MONGODB_URI` si no usas una instancia local:

```powershell
copy .env.example .env
# o en PowerShell: cp .env.example .env
# Ajusta MONGODB_URI si usas Atlas
```

3. Arrancar server:

```powershell
npm run dev # requiere nodemon o npm start
```

Endpoints:
- GET `/health` -> status
- GET `/api/register` -> lista registros
- POST `/api/register` -> crea registro. Body JSON: `{ "name": "Nombre", "email": "email@ejemplo.com" }`

Probar con curl:

```powershell
curl -X POST http://localhost:5000/api/register -H "Content-Type: application/json" -d '{"name":"Test","email":"test@example.com"}'
curl http://localhost:5000/api/register
```

Notas:
- El proyecto usa `MONGODB_URI` por defecto apuntando a `mongodb://127.0.0.1:27017/registrar_db`.
- Si quieres desplegar, usa MongoDB Atlas y actualiza `.env`.
- Si quieres desplegar, usa MongoDB Atlas y actualiza `.env`.

Docker/Compose:
Puedes levantar un MongoDB local y la API rápidamente con Docker Compose:

```powershell
docker compose up --build
```

El fichero `docker-compose.yml` arranca 2 servicios:
- `mongo` en el puerto 27017
- `api` en el puerto 5000 y con `MONGODB_URI` apuntando al servicio `mongo`

