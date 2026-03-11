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

1. Clonar el repositorio https://github.com/LuisSipps/Modulo3-Tarea1.git
2. Instalar dependencias
    En la dirección de la carpeta de nuestro proyecto deberemos instalar lo siguiente:
    - Inicializamos el proyecto Node.js                    > npm init -y
    - Instalamos Express                                   > npm i express
    - Instalamos Mongoose                                  > npm i mongoose
    - Instalamos bcrypt para Encriptar contraseñas         > npm install bcrypt
    - Instalamos jsonwebtoken para autentificacion con JWT > npm i jsonwebtoken

npm install

3. Crear archivo .env
En nuestro proyecto de Visual Studio Code debemos crear un nuevo archivo llamado .env
y copiar y pegar lo siguiente:

PORT=3000
MONGODB_URI=mongodb+srv://luissepulvedavillarroel_db_user:KsIveTGIsWsppC02@clusterdiplomadoipss.beyx1x4.mongodb.net/?appName=ClusterDiplomadoIPSS
JWT_SECRET=ipss

4. Ejecutar el servidor
En visual Studio Code abriremos una nueva terminal en la barra superior yescribir lo siguiente:
> npm start

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