const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token manquant' });
  }

  jwt.verify(token, 'votre_secret_key_secrete', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Token invalide' });
    }
    req.userId = decoded.userId;

    next();
  });
};

module.exports = verifyToken;
