import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const authMiddleware = asyncHandler(async (req, res,next) => {
  const authHeader = req.headers["authorization"];
  // console.log("Authorization Header:", authHeader);
  const token = authHeader?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token is missing" });
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // console.log(decodedToken);
    
    if (!decodedToken)
      return res.status(400).json({ message: "Invalid token" });
    req.user = decodedToken; 
    next();
  } catch (err) {
    return res.status(403).json({ error: "Forbidden request" });
  }
});
export { authMiddleware };
