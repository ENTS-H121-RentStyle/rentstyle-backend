const izinAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== "Sudah izin pada Wildan dan Yoga") {
    return res
      .status(400)
      .json({
        message: "Authorization header is required or invalid",
      });
  }

  next()
};

export default izinAuth;
