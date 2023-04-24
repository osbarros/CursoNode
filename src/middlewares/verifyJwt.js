import jwt from "jsonwebtoken";

export default async function verifyJWT(req, res, next) {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader)
      return res.status(401).json({ message: "No authorization header" });

    const [scheme, token] = authHeader.split(" ");

    if (!/^Bearer$/i.test(scheme))
      return res.status(401).json({ message: "Token bad formatted" }); // Bearer not found

    if (!token) return res.status(401).json({ message: "No token provided" }); // Token not found

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.user;

    next();
  } catch (error) {
    res.status(500).json({
      message: `Error in ending session: ${error}`,
    });
  }
}
