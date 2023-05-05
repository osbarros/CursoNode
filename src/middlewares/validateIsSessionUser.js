export default async function validateIsSessionUser(req, res, next) {
  if (req.user._id === req.body.userId) {
    next();
  } else {
    res.status(403).json({ message: `Invalid token data` });
  }
}
