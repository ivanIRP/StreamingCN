# 📊 Guía Rápida - Importar en phpMyAdmin

## Paso a Paso con Imágenes Mentales:

### 1️⃣ Abrir phpMyAdmin
```
http://localhost/phpmyadmin
```

### 2️⃣ Click en "Importar"
- Busca la pestaña **"Importar"** en el menú superior
- Está entre "SQL" y "Exportar"

### 3️⃣ Seleccionar Archivo
- Click en botón **"Seleccionar archivo"** o **"Choose File"**
- Navega hasta: `Database/movies_db.sql`
- Selecciona el archivo

### 4️⃣ Importar
- Scroll hasta abajo
- Click en botón **"Continuar"** o **"Go"**
- Espera unos segundos...

### 5️⃣ Verificar
- En el panel izquierdo verás la base **"MoviesDB"**
- Click en ella
- Click en tabla **"Peliculas"**
- Click en pestaña **"Examinar"**
- ✅ Deberías ver 10 películas

## ✅ ¡Listo!

Ahora puedes:
1. Ejecutar la API
2. Ejecutar la Web
3. Ver las películas en Android

---

## 🔧 Si tienes contraseña en MySQL:

Edita: `API/appsettings.json`

Cambia:
```json
"Pwd=;"
```

Por:
```json
"Pwd=tu_contraseña;"
```

---

**¡Fácil!** 🎉
