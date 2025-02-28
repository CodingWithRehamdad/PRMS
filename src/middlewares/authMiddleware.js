const jwt = require('jsonwebtoken')

    const auth = (req, res, next) => {
        let token = req.headers.authorization;
    
        if (token && token.startsWith('Bearer')) {
            token = token.split(' ')[1];
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                req.user = decoded;
                next();
            } catch (error) {
                res.status(401).json({ message: "Token is not valid", error: error.message });
            }
        } else {
            res.status(401).json({ message: "Please auhtenticate" });
        }
    };

const roleMiddleware = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied: insufficient persmission' })
    }
    next()
  }


module.exports = {
    auth,
    roleMiddleware
}