// db.js - Configuración y inicialización de la base de datos SQLite
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'cinenube.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos SQLite');
  }
});

// Habilitar foreign keys
db.run('PRAGMA foreign_keys = ON');

// Crear tablas
db.serialize(() => {

  // Tabla de administradores (usuarios de la app web)
  db.run(`
    CREATE TABLE IF NOT EXISTS administradores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido_paterno TEXT NOT NULL,
      apellido_materno TEXT DEFAULT '',
      email TEXT UNIQUE NOT NULL,
      usuario TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      clave TEXT UNIQUE NOT NULL,
      activo INTEGER DEFAULT 1,
      fecha_registro TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Tabla de clientes (usuarios de la app móvil)
  db.run(`
    CREATE TABLE IF NOT EXISTS clientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido_paterno TEXT NOT NULL,
      apellido_materno TEXT DEFAULT '',
      email TEXT UNIQUE NOT NULL,
      usuario TEXT UNIQUE NOT NULL,
      clave TEXT UNIQUE NOT NULL,
      activo INTEGER DEFAULT 1,
      fecha_registro TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Tabla de películas
  db.run(`
    CREATE TABLE IF NOT EXISTS peliculas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      genero TEXT NOT NULL,
      imagen_url TEXT DEFAULT '',
      descripcion TEXT NOT NULL,
      trailer_url TEXT DEFAULT '',
      activo INTEGER DEFAULT 1,
      fecha_registro TEXT DEFAULT (datetime('now', 'localtime'))
    )
  `);

  // Insertar admin por defecto si no existe
  const defaultPass = bcrypt.hashSync('admin123', 10);
  const defaultClave = generarClave();

  db.run(`
    INSERT OR IGNORE INTO administradores 
    (nombre, apellido_paterno, email, usuario, password_hash, clave)
    VALUES (?, ?, ?, ?, ?, ?)
  `, ['Admin', 'Sistema', 'admin@cinenube.com', 'admin', defaultPass, defaultClave]);

  // Insertar cliente demo si no existe
  const claveCli = generarClave();
  db.run(`
    INSERT OR IGNORE INTO clientes 
    (nombre, apellido_paterno, email, usuario, clave, activo)
    VALUES (?, ?, ?, ?, ?, ?)
  `, ['María', 'González', 'maria@demo.com', 'cliente1', claveCli, 1]);

  // Insertar película demo
  db.run(`
    INSERT OR IGNORE INTO peliculas 
    (id, nombre, genero, imagen_url, descripcion, trailer_url, activo)
    VALUES (1, 'Jeepers Creepers', 'Terror',
    'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Jeepers_Creepers_poster.jpg/220px-Jeepers_Creepers_poster.jpg',
    'Trish y Darry, dos hermanos universitarios, viajan por carretera para ir a visitar a sus padres. Por el camino, sintonizan una canción que anuncia la presencia de una criatura aterradora.',
    'https://www.youtube.com/watch?v=P2mHv9mVoVs', 1)
  `);

  console.log('📦 Tablas inicializadas correctamente');
});

// Función para generar clave aleatoria
function generarClave() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let clave = '';
  for (let i = 0; i < 10; i++) {
    clave += chars[Math.floor(Math.random() * chars.length)];
  }
  return clave.slice(0, 4) + '-' + clave.slice(4, 7) + '-' + clave.slice(7, 10);
}

module.exports = { db, generarClave };
