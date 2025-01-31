const jwt = require('jsonwebtoken');
const JWT_SECRET = 'DasunDeshaja';

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access Denied' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    console.log(err)
    if (err) return res.status(403).json({ message: 'Invalid Token' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
