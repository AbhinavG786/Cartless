import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler";

const authMiddleware = asyncHandler(async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token is missing" });
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!decodedToken)
      return res.status(400).json({ message: "Invalid token" });
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden request" });
  }
});
export { authMiddleware };
