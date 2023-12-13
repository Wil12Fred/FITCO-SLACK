#FITCO SLACK
======================

Se escogió el proyecto de slack donde se gestionará un producto multi-account, con espacios de trabajo y canales de mensajes grupales.

> Estructura de proyecto

### Estructura principal
    .
    ├── BACKEND                 # Servicios Backend (auth, admin, slack_socket)
    ├── FRONTEND                # Servicio Front

### Librerías usadas

> **Frontend libreries**: 
- bootstrap
- react
- react-dom

> **Backend libreries**: 
- @nestjs/common
- @nestjs/config
- @nestjs/core
- @nestjs/swagger
- @nestjs/typeorm
- ioredis
- sequelize
- typeorm

> **Testing libreries**: 
- @testing-library/react

> **Build, Transpile, Package and Deploy libraries**: 
- sass

> **Data Access and Manipulation libraries:**: 
- socket.io-client

> **Utilities:**:
- @types/node
- bcrypt
