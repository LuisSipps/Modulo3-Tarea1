# DESAFÍO INTEGRADOR 1: API POKEMÓN

Esta es una API REST desarrollada con Node.js, Express y MongoDB que permite a distintos 
usuarios registrarse en la plataforma y gestionar información sobre Pokémon y sus movimientos.


Modelos utilizados

Para este proyecto se utilizaron modelos inspirados en los ejemplos vistos en clases, 
pero adaptados al contexto de Pokémon:

| Modelo en clases | Modelo en el proyecto |
| ---------------- | --------------------- |
| Usuario          | Usuario               |
| Consola          | Pokemon               |
| Videojuego       | Movimiento            |


## Instalación

1. Clonar el repositorio
2. Instalar dependencias
    En la dirección de la carpeta de nuestro proyecto deberemos instalar lo siguiente:
    - Inicializamos el proyecto Node.js                    > npm init -y
    - Instalamos Express                                   > npm i express
    - Instalamos Mongoose                                  > npm i mongoose
    - Instalamos bcrypt para Encriptar contraseñas         > npm install bcrypt
    - Instalamos jsonwebtoken para autentificacion con JWT > npm i jsonwebtoken

npm install

3. Crear archivo .env

JWT_SECRET=tu_secreto

4. Ejecutar el servidor

npm run dev

## Endpoints principales

### Auth
POST /auth/register
POST /auth/login

### Pokemones
GET /pokemones
GET /pokemones/:id
POST /pokemones
PUT /pokemones/:id
DELETE /pokemones/:id

### Movimientos
GET /movimientos
POST /movimientos