# CineNube API — Guía de Instalación y Uso

## Requisitos
- Node.js 18+
- npm

## Instalación

```bash
cd cinenube-api
npm install
npm start
```

La API corre en: **http://localhost:3000**

---

## Autenticación

Todos los endpoints protegidos requieren el header:
```
Authorization: Bearer <TOKEN>
```

El token se obtiene al hacer login.

---

## Endpoints

### 🔐 Auth

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/api/auth/login/admin` | Login para administradores |
| POST | `/api/auth/login/cliente` | Login para clientes (app móvil) |

**Login Admin:**
```json
POST /api/auth/login/admin
{
  "usuario": "admin",
  "password": "admin123"
}
```

**Login Cliente:**
```json
POST /api/auth/login/cliente
{
  "usuario": "cliente1",
  "clave": "XXXX-XXX-XXX"
}
```

---

### 🎬 Películas

| Método | Ruta | Rol | Descripción |
|--------|------|-----|-------------|
| GET | `/api/peliculas` | ADMIN | Todas las películas |
| GET | `/api/peliculas/activas` | CLIENTE | Solo películas activas |
| POST | `/api/peliculas` | ADMIN | Registrar película |
| PUT | `/api/peliculas/:id` | ADMIN | Modificar película |
| PATCH | `/api/peliculas/:id/estado` | ADMIN | Activar/Inactivar |
| DELETE | `/api/peliculas/:id` | ADMIN | Eliminar película |

**Registrar película:**
```json
POST /api/peliculas
{
  "nombre": "Inception",
  "genero": "Ciencia Ficción",
  "imagen_url": "https://...",
  "descripcion": "Un ladrón que roba secretos...",
  "trailer_url": "https://youtube.com/..."
}
```

**Cambiar estado:**
```json
PATCH /api/peliculas/1/estado
{ "activo": 1 }   // 1 = activar, 0 = inactivar
```

---

### 👤 Clientes

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/clientes` | Listar todos |
| POST | `/api/clientes` | Registrar (clave auto-generada) |
| PUT | `/api/clientes/:id` | Modificar (clave NO cambia) |
| PATCH | `/api/clientes/:id/estado` | Activar/Inactivar |
| DELETE | `/api/clientes/:id` | Eliminar |

**Registrar cliente:**
```json
POST /api/clientes
{
  "nombre": "Juan",
  "apellido_paterno": "García",
  "apellido_materno": "López",
  "email": "juan@mail.com",
  "usuario": "juan_garcia"
}
// La "clave" es generada automáticamente por el servidor
// y NO puede ser modificada posteriormente
```

---

### 🔧 Administradores

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/administradores` | Listar todos |
| POST | `/api/administradores` | Registrar (clave auto-generada) |
| PUT | `/api/administradores/:id` | Modificar (clave NO cambia) |
| PATCH | `/api/administradores/:id/estado` | Activar/Inactivar |

---

## Respuestas estándar

**Éxito:**
```json
{
  "success": true,
  "message": "Operación exitosa",
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descripción del error"
}
```

---

## Variables de entorno (opcional)

Crea un archivo `.env`:
```
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura
```
