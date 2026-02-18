// middleware/auth.js - Verificación de tokens JWT
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'cinenube_secret_key_2024';

// Middleware para administradores (app web)
const verificarAdmin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acceso requerido' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.tipo !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Acceso denegado: se requiere rol de administrador' 
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }
};

// Middleware para clientes (app móvil)
const verificarCliente = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acceso requerido' 
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.tipo !== 'cliente') {
      return res.status(403).json({ 
        success: false, 
        message: 'Acceso denegado' 
      });
    }
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ 
      success: false, 
      message: 'Token inválido o expirado' 
    });
  }
};

// Middleware que acepta ambos roles
const verificarAmbos = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token requerido' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Token inválido' });
  }
};

module.exports = { verificarAdmin, verificarCliente, verificarAmbos, JWT_SECRET };
