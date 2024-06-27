  const jwt = require('jsonwebtoken');
  const JWT_SECRET = "Harryisagood$oy";

  const fetchuser = (req, res, next) => {
    // Get the user from the JWT token and add it to the req object
    const token = req.header('auth-token');
    if (!token) {
      return res.status(401).json({ error: "Please authenticate using a valid token" });
    }
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Invalid token" });
    }
  };

  module.exports = fetchuser;
