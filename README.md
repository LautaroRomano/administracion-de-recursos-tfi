## Para correr el sistema

Instalar dependencias


```bash
npm install
```

Crear variables de entorno

.env
```bash
DATABASE_URL=postgresql://usuario:contrasena@localhost:5432/database?schema=public
```

Migrar la base de datos

```bash
npx prisma migrate dev --name init
```

Crear datos

```bash
npx prisma db seed
```

Start the server

```bash
npm run dev
```

Ahora puedes visitar https://localhost:3000 En tu navegador.
