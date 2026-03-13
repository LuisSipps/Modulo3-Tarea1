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

1. Clonar el repositorio:
    - Ir al repositorio en Github https://github.com/LuisSipps/Modulo3-Tarea1.git
    - Presionar el boton verde <> code y apretamos Download ZIP.
    - Extraemos el archivo ZIP y la abrimos en Visual Studio Code.

2. Instalar dependencias
    - Abrimos un CMD como administrador y abrimos nuestro proyecto
    - Ahora ejecutamos > npm install

3. Crear archivo .env en Visual Studio Code
Crear un archivo llamado `.env` en la raíz del proyecto con el siguiente contenido:

PORT=3000
MONGODB_URI=tu_uri_de_mongodb
JWT_SECRET=tu_clave_secreta

4. Ejecutar el servidor
En el CMD o en una terminal de Visual Studio Code ejecutaremos nuestro servidor con:
> npm start

## Endpoints principales

### Auth
POST http://localhost:3000/api/auth/register
POST http://localhost:3000/api/auth/login

### Pokemones
GET http://localhost:3000/api/pokemones
POST http://localhost:3000/api/pokemones/
PUT http://localhost:3000/api/pokemones/69a5a0cc36dba5041b349947
DELETE http://localhost:3000/api/pokemones/69a5a0cc36dba5041b349947

### Movimientos
GET http://localhost:3000/api/movimientos/
POST http://localhost:3000/api/movimientos/

## Autor

Luis Sepúlveda Villarroel