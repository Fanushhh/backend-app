const authMiddleware = (req, res, next) => {
  if (!req.cookies.accessToken) {
    res.status(401);
    res.json({
      error: "Access expired, login again!",
      severity: "error",
    });
  }

  next();
};

export default authMiddleware;
