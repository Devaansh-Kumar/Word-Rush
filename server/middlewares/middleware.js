const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Failed to authenticate token' });
      }
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}

module.exports = { authenticateToken };
