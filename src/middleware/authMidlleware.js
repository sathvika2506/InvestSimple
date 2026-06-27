const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token; // Retrieve from httpOnly cookie[cite: 1]
    if (!token) return res.status(403).json({ message: "Access denied" });
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};