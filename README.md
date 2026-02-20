# 🎬 Sistema de Películas - Con MySQL + phpMyAdmin

## ✅ TODO INCLUIDO

- ✅ Base de datos MySQL
- ✅ Archivo SQL para importar en phpMyAdmin
- ✅ API con conexión MySQL
- ✅ 10 películas incluidas
- ✅ Web Admin completa
- ✅ Android App completa

## 📁 Estructura

```
MoviesSystem/
├── Database/
│   └── movies_db.sql        ← IMPORTAR ESTE ARCHIVO EN PHPMYADMIN
├── API/                     ← API REST .NET
├── WebAdmin/                ← Aplicación Web
└── AndroidApp/              ← App Android
```

## 🗄️ PASO 1: Importar Base de Datos

### Opción A: Con phpMyAdmin (Recomendado)

1. Abre **phpMyAdmin** (http://localhost/phpmyadmin)
2. Click en **"Importar"** (pestaña superior)
3. Click en **"Seleccionar archivo"**
4. Selecciona: `Database/movies_db.sql`
5. Click en **"Continuar"** (abajo)
6. ✅ ¡Listo! Base de datos `MoviesDB` creada con 10 películas

### Opción B: Por línea de comandos

```bash
mysql -u root -p < Database/movies_db.sql
```

## 🔧 PASO 2: Configurar Conexión

### Edita SOLO si tu MySQL tiene contraseña:

**Archivo:** `API/appsettings.json`

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=MoviesDB;Uid=root;Pwd=TU_CONTRASEÑA;"
}
```

**Por defecto:** `Pwd=` (sin contraseña)

## 🚀 PASO 3: Ejecutar el Sistema

### Terminal 1 - API
```bash
cd API
dotnet restore
dotnet run
```
✅ API en http://localhost:5000

### Terminal 2 - Web Admin
```bash
cd WebAdmin
dotnet restore
dotnet run
```
✅ Web en http://localhost:5001

### Android Studio
1. Edita `ApiClient.java` (línea 11):
   - Emulador: `http://10.0.2.2:5000/api/`
   - Dispositivo: `http://TU_IP:5000/api/`
2. Open Project → `AndroidApp`
3. Sync Gradle
4. Run ▶️

## 🎬 Películas Incluidas (10)

1. **El Padrino** (Drama, 1972)
2. **Inception** (Ciencia Ficción, 2010)
3. **Pulp Fiction** (Crimen, 1994)
4. **Interestelar** (Ciencia Ficción, 2014)
5. **The Dark Knight** (Acción, 2008)
6. **Forrest Gump** (Drama, 1994)
7. **Matrix** (Ciencia Ficción, 1999)
8. **El Señor de los Anillos** (Fantasía, 2001)
9. **Parásitos** (Suspenso, 2019)
10. **Gladiador** (Acción, 2000)

## 📊 Estructura de la Base de Datos

**Tabla:** `Peliculas`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| Id | INT (PK, AI) | ID único |
| Nombre | VARCHAR(200) | Nombre película |
| Sinopsis | TEXT | Descripción |
| Categoria | VARCHAR(100) | Género |
| Anio | INT | Año estreno |
| LinkPelicula | VARCHAR(500) | URL (opcional) |
| FechaRegistro | DATETIME | Fecha registro |

## 🔍 Verificar que Funcionó

### En phpMyAdmin:
1. Click en base de datos `MoviesDB`
2. Click en tabla `Peliculas`
3. Deberías ver 10 películas

### En la API:
Abre: http://localhost:5000/swagger

### En la Web:
Abre: http://localhost:5001

## ⚠️ Solución de Problemas

### Error: "Access denied for user 'root'"
**Solución:** Edita `appsettings.json` y agrega tu contraseña MySQL:
```json
"Pwd=tu_contraseña_aqui;"
```

### Error: "Unknown database 'MoviesDB'"
**Solución:** Importa el archivo SQL en phpMyAdmin primero.

### Error en Android: "Unable to resolve host"
**Solución:**
- Emulador: Usa `10.0.2.2` no `localhost`
- Dispositivo: Usa tu IP local (ejecuta `ipconfig` en Windows)

## 🎨 Características

- **Web Admin:** Agregar/Editar/Eliminar películas
- **Android:** Ver películas + Abrir links
- **MySQL:** Base de datos relacional
- **phpMyAdmin:** Administración visual

## 📝 Campos de Película

- ✅ Nombre (requerido)
- ✅ Sinopsis (requerido)
- ✅ Categoría (requerido)
- ✅ Año (requerido)
- ✅ Link Película (opcional)

## 🎯 Categorías Disponibles

- Acción
- Aventura
- Ciencia Ficción
- Comedia
- Crimen
- Drama
- Fantasía
- Horror
- Romance
- Suspenso

## 📦 Requisitos

- ✅ .NET 8.0 SDK
- ✅ MySQL (XAMPP, WAMP, etc.)
- ✅ Android Studio (para app móvil)

## 🚀 Subir a GitHub

```bash
git init
git add .
git commit -m "Sistema de películas con MySQL"
git remote add origin https://github.com/TU_USUARIO/movies-system.git
git push -u origin main
```

---

**¡Sistema 100% funcional con MySQL!** 🎉
# cine_hub
