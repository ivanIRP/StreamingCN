# CineNube - App Android

## Requisitos
- Android Studio Hedgehog (2023.1.1) o superior
- JDK 17
- Android SDK 34
- Dispositivo/Emulador con Android 7.0+ (API 24)

## Pasos para abrir el proyecto

1. Abre **Android Studio**
2. Selecciona **"Open"** y navega a la carpeta `cinenube-android`
3. Espera a que Gradle sincronice (puede tardar unos minutos la primera vez)
4. El proyecto estará listo

## Configurar la URL de la API

Abre el archivo:
```
app/src/main/java/com/cinenube/app/api/ApiClient.java
```

Cambia `BASE_URL` según tu entorno:

```java
// Emulador Android (la API corre en tu PC)
public static final String BASE_URL = "http://10.0.2.2:3000/";

// Dispositivo físico en la misma red WiFi
public static final String BASE_URL = "http://192.168.1.X:3000/";
// (reemplaza 192.168.1.X con la IP de tu PC)

// Producción
public static final String BASE_URL = "https://tudominio.com/";
```

> ⚠️ Para encontrar la IP de tu PC: `ipconfig` (Windows) o `ifconfig` (Mac/Linux)

## Cómo funciona la app

### Login del cliente
- El cliente ingresa su **usuario** y su **clave** (generada por el admin)
- La clave es del formato `XXXX-XXX-XXX` — el admin la ve en el panel web
- Si el cliente está **inactivo**, no puede iniciar sesión
- Si el login es exitoso, se guarda el **JWT token** en SharedPreferences

### Lista de películas
- Solo muestra películas con estado **Activo**
- Desliza hacia abajo para actualizar (pull-to-refresh)
- Toca **VER** para abrir el detalle y el tráiler

### Ver tráiler
- Muestra la URL del tráiler
- Botón **VER TRÁILER** abre el link en el navegador o YouTube

## Estructura del proyecto

```
app/
├── api/
│   ├── ApiClient.java      ← Configuración Retrofit + URL base
│   └── ApiService.java     ← Endpoints de la API
├── model/
│   ├── LoginRequest.java   ← Body del POST login
│   ├── LoginResponse.java  ← Respuesta del login (token + datos)
│   ├── ClienteInfo.java    ← Datos del cliente autenticado
│   ├── Pelicula.java       ← Modelo de película
│   └── PeliculasResponse.java
├── ui/
│   ├── login/
│   │   └── LoginActivity.java
│   └── peliculas/
│       ├── PeliculasActivity.java  ← Lista con RecyclerView
│       ├── PeliculasAdapter.java   ← Adapter del RecyclerView
│       └── DetalleActivity.java    ← Detalle + tráiler
└── utils/
    └── SessionManager.java  ← Manejo del token JWT
```

## Dependencias principales

| Librería | Uso |
|----------|-----|
| Retrofit 2 | Llamadas HTTP a la API REST |
| Gson | Parsear JSON |
| Glide | Cargar imágenes de los pósters |
| OkHttp Logging | Ver requests en Logcat |
| SwipeRefreshLayout | Pull-to-refresh |

## Flujo de comunicación

```
App Android
    │
    ├── POST /api/auth/login/cliente  ←── { usuario, clave }
    │         └── Respuesta: { token, cliente }
    │
    └── GET /api/peliculas/activas
              Header: Authorization: Bearer <token>
              └── Respuesta: { data: [pelicula1, pelicula2, ...] }
```
