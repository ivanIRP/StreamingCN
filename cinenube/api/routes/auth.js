// routes/auth.js - Rutas de autenticación
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../db');
const { JWT_SECRET } = require('../middleware/auth');

/**
 * POST /api/auth/login/admin
 * Login para administradores (app web)
 * Body: { usuario, password }
 */
router.post('/login/admin', (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Usuario y contraseña son requeridos' 
    });
  }

  db.get(
    'SELECT * FROM administradores WHERE usuario = ? AND activo = 1',
    [usuario],
    (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error del servidor' });
      }
      if (!row) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario o contraseña incorrectos' 
        });
      }

      const passwordValida = bcrypt.compareSync(password, row.password_hash);
      if (!passwordValida) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario o contraseña incorrectos' 
        });
      }

      const token = jwt.sign(
        { id: row.id, usuario: row.usuario, tipo: 'admin', nombre: row.nombre },
        JWT_SECRET,
        { expiresIn: '8h' }
      );

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        admin: {
          id: row.id,
          nombre: row.nombre,
          apellido_paterno: row.apellido_paterno,
          email: row.email,
          usuario: row.usuario
        }
      });
    }
  );
});

/**
 * POST /api/auth/login/cliente
 * Login para clientes (app móvil)
 * Body: { usuario, clave }   <- el cliente usa su CLAVE como contraseña
 */
router.post('/login/cliente', (req, res) => {
  const { usuario, clave } = req.body;

  if (!usuario || !clave) {
    return res.status(400).json({ 
      success: false, 
      message: 'Usuario y clave son requeridos' 
    });
  }

  db.get(
    'SELECT * FROM clientes WHERE usuario = ?',
    [usuario],
    (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error del servidor' });
      }
      if (!row) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario o clave incorrectos' 
        });
      }
      if (!row.activo) {
        return res.status(403).json({ 
          success: false, 
          message: 'Tu cuenta está inactiva. Contacta al administrador.' 
        });
      }
      if (row.clave !== clave) {
        return res.status(401).json({ 
          success: false, 
          message: 'Usuario o clave incorrectos' 
        });
      }

      const token = jwt.sign(
        { id: row.id, usuario: row.usuario, tipo: 'cliente', nombre: row.nombre },
        JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        success: true,
        message: 'Inicio de sesión exitoso',
        token,
        cliente: {
          id: row.id,
          nombre: row.nombre,
          apellido_paterno: row.apellido_paterno,
          email: row.email,
          usuario: row.usuario
        }
      });
    }
  );
});

module.exports = router;
