const JWT_PROVIDER = require('../Config/JWT');
const User_Service = require('../Services/User-Service');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token Not Found" });

    const userId = JWT_PROVIDER.getUserIdFromToken(token);
    const user = await User_Service.findUserById(userId);
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // ✅ authenticated user
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticate;
