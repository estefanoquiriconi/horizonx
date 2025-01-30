# HorizonX

## Instalación

1. Crear una base de datos en MySQL con el nombre `horizonx_db`.

2. Instalar las dependencias:

   ```sh
   npm install
   ```

3. Copiar el archivo de ejemplo de configuración:

   ```sh
   cp .env.example .env
   ```

4. Ejecutar las migraciones de la base de datos:

   ```sh
   npx sequelize db:migrate
   ```

5. Ejecutar los seeders de la base de datos:

   ```sh
   npx sequelize db:seed:all
   ```

6. Iniciar el servidor en modo desarrollo:

   ```sh
   npm run dev
   ```

7. Ejecutar las migraciones en el entorno de prueba:
   ```sh
   NODE_ENV=test npx sequelize-cli db:migrate
   ```
