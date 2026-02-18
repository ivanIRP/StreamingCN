// routes/clientes.js - CRUD de clientes
const express = require('express');
const router = express.Router();
const { db, generarClave } = require('../db');
const { verificarAdmin } = require('../middleware/auth');

/**
 * GET /api/clientes
 * [ADMIN] Listar todos los clientes
 */
router.get('/', verificarAdmin, (req, res) => {
  db.all(
    'SELECT id, nombre, apellido_paterno, apellido_materno, email, usuario, clave, activo, fecha_registro FROM clientes ORDER BY fecha_registro DESC',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: rows });
    }
  );
});

/**
 * POST /api/clientes
 * [ADMIN] Registrar nuevo cliente
 * Body: { nombre, apellido_paterno, apellido_materno, email, usuario }
 * La clave se genera automáticamente en el servidor
 */
router.post('/', verificarAdmin, (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, email, usuario } = req.body;

  if (!nombre || !apellido_paterno || !email || !usuario) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre, apellido paterno, email y usuario son requeridos' 
    });
  }

  // Verificar que el usuario no exista
  db.get('SELECT id FROM clientes WHERE usuario = ? OR email = ?', [usuario, email], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (row) return res.status(409).json({ success: false, message: 'El usuario o email ya existe' });

    const clave = generarClave(); // Generada automáticamente, no modificable

    db.run(
      `INSERT INTO clientes (nombre, apellido_paterno, apellido_materno, email, usuario, clave)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, apellido_paterno, apellido_materno || '', email, usuario, clave],
      function (err) {
        if (err) return res.status(500).json({ success: false, message: err.message });
        res.status(201).json({
          success: true,
          message: 'Cliente registrado correctamente',
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
 * PUT /api/clientes/:id
 * [ADMIN] Modificar datos del cliente (NO se puede cambiar la clave)
 * Body: { nombre, apellido_paterno, apellido_materno, email, usuario }
 */
router.put('/:id', verificarAdmin, (req, res) => {
  const { nombre, apellido_paterno, apellido_materno, email, usuario } = req.body;

  if (!nombre || !apellido_paterno || !email || !usuario) {
    return res.status(400).json({ success: false, message: 'Campos requeridos faltantes' });
  }

  // La clave NO se actualiza nunca
  db.run(
    `UPDATE clientes SET nombre=?, apellido_paterno=?, apellido_materno=?, email=?, usuario=?
     WHERE id=?`,
    [nombre, apellido_paterno, apellido_materno || '', email, usuario, req.params.id],
    function (err) {
      if (err) {
        if (err.message.includes('UNIQUE')) {
          return res.status(409).json({ success: false, message: 'El usuario o email ya existe' });
        }
        return res.status(500).json({ success: false, message: err.message });
      }
      if (this.changes === 0) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
      res.json({ success: true, message: 'Cliente actualizado. La clave permanece sin cambios.' });
    }
  );
});

/**
 * PATCH /api/clientes/:id/estado
 * [ADMIN] Activar o inactivar cliente
 * Body: { activo: 0 | 1 }
 */
router.patch('/:id/estado', verificarAdmin, (req, res) => {
  const { activo } = req.body;
  if (activo === undefined) {
    return res.status(400).json({ success: false, message: 'Campo "activo" requerido' });
  }

  db.run(
    'UPDATE clientes SET activo=? WHERE id=?',
    [activo ? 1 : 0, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (this.changes === 0) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
      res.json({ 
        success: true, 
        message: `Cliente ${activo ? 'activado' : 'inactivado'}. ${!activo ? 'No podrá acceder a la app móvil.' : ''}` 
      });
    }
  );
});

/**
 * DELETE /api/clientes/:id
 * [ADMIN] Eliminar cliente
 */
router.delete('/:id', verificarAdmin, (req, res) => {
  db.run('DELETE FROM clientes WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (this.changes === 0) return res.status(404).json({ success: false, message: 'Cliente no encontrado' });
    res.json({ success: true, message: 'Cliente eliminado correctamente' });
  });
});

module.exports = router;
