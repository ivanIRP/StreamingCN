// routes/administradores.js - CRUD de administradores
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { db, generarClave } = require('../db');
const { verificarAdmin } = require('../middleware/auth');

/**
 * GET /api/administradores
 * [ADMIN] Listar todos los administradores
 */
router.get('/', verificarAdmin, (req, res) => {
  db.all(
    'SELECT id, nombre, apellido_paterno, apellido_materno, email, usuario, clave, activo, fecha_registro FROM administradores ORDER BY fecha_registro DESC',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: rows });
    }
  );
});

/**
 * POST /api/administradores
 * [ADMIN] Registrar nuevo administrador
 * Body: { nombre, apellido_paterno, apellido_materno, email, usuario, password }
 * La clave se genera automáticamente
 */
router.post('/', verificarAdmin, (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, email, usuario, password } = req.body;

  if (!nombre || !apellido_paterno || !email || !usuario || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Todos los campos son requeridos' 
    });
  }

  db.get('SELECT id FROM administradores WHERE usuario = ? OR email = ?', [usuario, email], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (row) return res.status(409).json({ success: false, message: 'El usuario o email ya existe' });

    const passwordHash = bcrypt.hashSync(password, 10);
    const clave = generarClave(); // Generada automáticamente, no modificable

    db.run(
      `INSERT INTO administradores (nombre, apellido_paterno, apellido_materno, email, usuario, password_hash, clave)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, apellido_paterno, apellido_materno || '', email, usuario, passwordHash, clave],
      function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.status(201).json({
          success: true,
          message: 'Administrador registrado correctamente',
          data: {
            id: this.lastID, nombre, apellido_paterno, apellido_materno,
            email, usuario, clave, activo: 1
          }
        });
      }
    );
  });
});

/**
 * PUT /api/administradores/:id
 * [ADMIN] Modificar administrador (NO se puede cambiar la clave)
 * Body: { nombre, apellido_paterno, apellido_materno, email, usuario, password? }
 */
router.put('/:id', verificarAdmin, (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, email, usuario, password } = req.body;

  if (!nombre || !apellido_paterno || !email || !usuario) {
    return res.status(400).json({ success: false, message: 'Campos requeridos faltantes' });
  }

  // Si se incluye nueva contraseña, actualizarla; si no, mantener la actual
  if (password) {
    const passwordHash = bcrypt.hashSync(password, 10);
    db.run(
      `UPDATE administradores SET nombre=?, apellido_paterno=?, apellido_materno=?, email=?, usuario=?, password_hash=?
       WHERE id=?`,
      [nombre, apellido_paterno, apellido_materno || '', email, usuario, passwordHash, req.params.id],
      handleUpdate(res)
    );
  } else {
    db.run(
      `UPDATE administradores SET nombre=?, apellido_paterno=?, apellido_materno=?, email=?, usuario=?
       WHERE id=?`,
      [nombre, apellido_paterno, apellido_materno || '', email, usuario, req.params.id],
      handleUpdate(res)
    );
  }
});

function handleUpdate(res) {
  return function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ success: false, message: 'El usuario o email ya existe' });
      }
      return res.status(500).json({ success: false, message: err.message });
    }
    if (this.changes === 0) return res.status(404).json({ success: false, message: 'Administrador no encontrado' });
    res.json({ success: true, message: 'Administrador actualizado. La clave permanece sin cambios.' });
  };
}

/**
 * PATCH /api/administradores/:id/estado
 * [ADMIN] Activar o inactivar administrador
 */
router.patch('/:id/estado', verificarAdmin, (req, res) => {
  const { activo } = req.body;
  if (activo === undefined) {
    return res.status(400).json({ success: false, message: 'Campo "activo" requerido' });
  }

  db.run(
    'UPDATE administradores SET activo=? WHERE id=?',
    [activo ? 1 : 0, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (this.changes === 0) return res.status(404).json({ success: false, message: 'Administrador no encontrado' });
      res.json({ success: true, message: `Administrador ${activo ? 'activado' : 'inactivado'}` });
    }
  );
});

module.exports = router;
