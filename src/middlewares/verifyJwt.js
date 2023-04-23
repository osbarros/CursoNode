import { UnauthorizedError } from "../errors/baseErrors.js";
import { decodeAccessToken } from "../utils/libs/jwt.js";

export default async function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader) throw new UnauthorizedError("No authorization header");

    const [scheme, token] = authHeader.split(" ");

    if (!/^Bearer$/i.test(scheme))
      throw new UnauthorizedError("Token bad formatted"); // Bearer not found

    if (!token) throw new UnauthorizedError("No token provided"); // Token not found

    const decoded = decodeAccessToken(token);
    req.isAdmin = decoded.user.isAdmin;

    next();
  } catch (error) {
    res.status(500).json({
      message: `Error in ending session: ${error}`,
    });
  }
}
