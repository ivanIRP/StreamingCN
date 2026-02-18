// routes/peliculas.js - CRUD de películas
const express = require('express');
const router = express.Router();
const { db, generarClave } = require('../db');
const { verificarAdmin, verificarCliente } = require('../middleware/auth');

/**
 * GET /api/peliculas
 * [ADMIN] Obtener TODAS las películas (activas e inactivas)
 */
router.get('/', verificarAdmin, (req, res) => {
  db.all('SELECT * FROM peliculas ORDER BY fecha_registro DESC', [], (err, rows) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    res.json({ success: true, data: rows });
  });
});

/**
 * GET /api/peliculas/activas
 * [CLIENTE] Obtener solo películas ACTIVAS (para la app móvil)
 */
router.get('/activas', verificarCliente, (req, res) => {
  db.all(
    'SELECT id, nombre, genero, imagen_url, descripcion, trailer_url, fecha_registro FROM peliculas WHERE activo = 1 ORDER BY fecha_registro DESC',
    [],
    (err, rows) => {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.json({ success: true, data: rows });
    }
  );
});

/**
 * GET /api/peliculas/:id
 * [ADMIN] Obtener una película por ID
 */
router.get('/:id', verificarAdmin, (req, res) => {
  db.get('SELECT * FROM peliculas WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (!row) return res.status(404).json({ success: false, message: 'Película no encontrada' });
    res.json({ success: true, data: row });
  });
});

/**
 * POST /api/peliculas
 * [ADMIN] Registrar nueva película
 * Body: { nombre, genero, imagen_url, descripcion, trailer_url }
 */
router.post('/', verificarAdmin, (req, res) => {
  const { nombre, genero, imagen_url, descripcion, trailer_url } = req.body;

  if (!nombre || !genero || !descripcion) {
    return res.status(400).json({ 
      success: false, 
      message: 'Nombre, género y descripción son requeridos' 
    });
  }

  db.run(
    `INSERT INTO peliculas (nombre, genero, imagen_url, descripcion, trailer_url) 
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, genero, imagen_url || '', descripcion, trailer_url || ''],
    function (err) {
      if (err) return res.status(500).json({ success: false, message: err.message });
      res.status(201).json({
        success: true,
        message: 'Película registrada correctamente',
        data: { id: this.lastID, nombre, genero, imagen_url, descripcion, trailer_url, activo: 1 }
      });
    }
  );
});

/**
 * PUT /api/peliculas/:id
 * [ADMIN] Modificar película
 */
router.put('/:id', verificarAdmin, (req, res) => {
  const { nombre, genero, imagen_url, descripcion, trailer_url } = req.body;

  if (!nombre || !genero || !descripcion) {
    return res.status(400).json({ success: false, message: 'Campos requeridos faltantes' });
  }

  db.run(
    `UPDATE peliculas SET nombre=?, genero=?, imagen_url=?, descripcion=?, trailer_url=?
     WHERE id=?`,
    [nombre, genero, imagen_url || '', descripcion, trailer_url || '', req.params.id],
    function (err) {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (this.changes === 0) return res.status(404).json({ success: false, message: 'Película no encontrada' });
      res.json({ success: true, message: 'Película actualizada correctamente' });
    }
  );
});

/**
 * PATCH /api/peliculas/:id/estado
 * [ADMIN] Activar o inactivar película
 * Body: { activo: 0 | 1 }
 */
router.patch('/:id/estado', verificarAdmin, (req, res) => {
  const { activo } = req.body;
  if (activo === undefined) {
    return res.status(400).json({ success: false, message: 'Campo "activo" requerido' });
  }

  db.run(
    'UPDATE peliculas SET activo=? WHERE id=?',
    [activo ? 1 : 0, req.params.id],
    function (err) {
      if (err) return res.status(500).json({ success: false, message: err.message });
      if (this.changes === 0) return res.status(404).json({ success: false, message: 'Película no encontrada' });
      res.json({ 
        success: true, 
        message: `Película ${activo ? 'activada' : 'inactivada'} correctamente` 
      });
    }
  );
});

/**
 * DELETE /api/peliculas/:id
 * [ADMIN] Eliminar película
 */
router.delete('/:id', verificarAdmin, (req, res) => {
  db.run('DELETE FROM peliculas WHERE id=?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ success: false, message: err.message });
    if (this.changes === 0) return res.status(404).json({ success: false, message: 'Película no encontrada' });
    res.json({ success: true, message: 'Película eliminada correctamente' });
  });
});

module.exports = router;
