# 🎬 CineNube — Plataforma de Streaming

Sistema completo con 3 componentes que se comunican entre sí:

```
┌──────────────────┐     HTTP/REST      ┌────────────────────┐
│   App Web (HTML) │ ──────────────────▶│                    │
│  Administradores │                    │   API REST         │
│  (Panel CRUD)    │ ◀────────────────  │   (Node.js +       │
└──────────────────┘    JSON responses  │    SQLite)         │
                                        │                    │
┌──────────────────┐     HTTP/REST      │  localhost:3000    │
│  App Android     │ ──────────────────▶│                    │
│  Clientes        │                    │                    │
│  (Ver películas) │ ◀────────────────  └────────────────────┘
└──────────────────┘
```

---

## Componentes

| Componente | Tecnología | Carpeta | Usuario |
|------------|-----------|---------|---------|
| App Web | HTML + JS puro | `streaming_web.html` | Administradores |
| API REST | Node.js + Express + SQLite | `cinenube-api/` | — |
| App Móvil | Android (Java) | `cinenube-android/` | Clientes |

---

## Inicio Rápido

### 1. Levantar la API

```bash
cd cinenube-api
npm install
npm start
# API corriendo en http://localhost:3000
```

### 2. Abrir la App Web
Abre `streaming_web.html` en tu navegador  
Login: `admin` / `admin123`

### 3. Abrir App Android
- Abre la carpeta `cinenube-android` en Android Studio
- Cambia la `BASE_URL` en `ApiClient.java` si usas dispositivo físico
- Run ▶️

---

## Roles del sistema

| Rol | Acceso | Autenticación |
|-----|--------|---------------|
| **Administrador** | App Web únicamente | Usuario + Contraseña |
| **Cliente** | App Móvil únicamente | Usuario + **Clave** (auto-generada) |

### Diferencia clave:
- La **clave** del cliente es generada automáticamente por el servidor y **NO puede modificarse**
- El admin registra al cliente desde la web, y le comparte su clave para que acceda a la app
- Solo los clientes con estado **Activo** pueden iniciar sesión en la app

---

## Credenciales demo

| Rol | Usuario | Clave/Contraseña |
|-----|---------|-----------------|
| Admin | `admin` | `admin123` |
| Cliente demo | `cliente1` | Ver en panel web → Consultar Clientes |
