// server.js - Servidor principal de la API CineNube
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── MIDDLEWARES ───────────────────────────────────────────────
app.use(cors({
  origin: '*', // En producción: especifica el dominio de la app web
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imágenes subidas
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ─── INICIALIZAR DB ────────────────────────────────────────────
require('./db'); // Crea tablas y datos demo si no existen

// ─── RUTAS ────────────────────────────────────────────────────
const authRoutes          = require('./routes/auth');
const peliculasRoutes     = require('./routes/peliculas');
const clientesRoutes      = require('./routes/clientes');
const administradoresRoutes = require('./routes/administradores');

app.use('/api/auth',            authRoutes);
app.use('/api/peliculas',       peliculasRoutes);
app.use('/api/clientes',        clientesRoutes);
app.use('/api/administradores', administradoresRoutes);

// ─── RUTA RAÍZ (documentación rápida) ─────────────────────────
app.get('/', (req, res) => {
  res.json({
    name: 'CineNube API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      auth: {
        'POST /api/auth/login/admin':   'Login administrador (usuario + password)',
        'POST /api/auth/login/cliente': 'Login cliente (usuario + clave)'
      },
      peliculas: {
        'GET  /api/peliculas':             '[ADMIN] Todas las películas',
        'GET  /api/peliculas/activas':     '[CLIENTE] Solo películas activas',
        'GET  /api/peliculas/:id':         '[ADMIN] Una película',
        'POST /api/peliculas':             '[ADMIN] Registrar película',
        'PUT  /api/peliculas/:id':         '[ADMIN] Modificar película',
        'PATCH /api/peliculas/:id/estado': '[ADMIN] Activar/Inactivar',
        'DELETE /api/peliculas/:id':       '[ADMIN] Eliminar'
      },
      clientes: {
        'GET  /api/clientes':              '[ADMIN] Listar clientes',
        'POST /api/clientes':              '[ADMIN] Registrar cliente (clave auto)',
        'PUT  /api/clientes/:id':          '[ADMIN] Modificar cliente',
        'PATCH /api/clientes/:id/estado':  '[ADMIN] Activar/Inactivar',
        'DELETE /api/clientes/:id':        '[ADMIN] Eliminar'
      },
      administradores: {
        'GET  /api/administradores':             '[ADMIN] Listar admins',
        'POST /api/administradores':             '[ADMIN] Registrar admin (clave auto)',
        'PUT  /api/administradores/:id':         '[ADMIN] Modificar admin',
        'PATCH /api/administradores/:id/estado': '[ADMIN] Activar/Inactivar'
      }
    }
  });
});

// ─── MANEJO DE ERRORES 404 ─────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Ruta ${req.path} no encontrada` });
});

// ─── INICIAR SERVIDOR ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🎬 CineNube API corriendo en http://localhost:${PORT}`);
  console.log(`📋 Documentación en http://localhost:${PORT}/\n`);
  console.log('Credenciales por defecto:');
  console.log('  Admin → usuario: admin | password: admin123');
  console.log('  Cliente demo → usuario: cliente1 | clave: (ver en BD)\n');
});

module.exports = app;
