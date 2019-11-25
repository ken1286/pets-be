const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = process.env.JWT_SECRET || 'this is my secret!';

  if (token) {
    jwt.verify(token, secret, {}, (err, decodeToken) => {
      if (err) {
        //invalid token
        res.status(401).json({ you: 'shall not pass' });
      } else {
        //valid token

        // req.jwt = { username: decodeToken.username, userId: decodeToken.subject };
        req.user = { username: decodeToken.username, id: decodeToken.subject };

        next();
      }
    });
  } else {
    res.status(401).json({ you: 'no token provided' });
  }
};
