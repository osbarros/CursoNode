import jwt from "jsonwebtoken";

export default async function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No authorization header" });

  const [scheme, token] = authHeader.split(" ");

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ message: "Token bad formatted" }); // Bearer not found

  if (!token) return res.status(401).json({ message: "No token provided" }); // Token not found

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.user = decoded.user;
    next();
  });
}
