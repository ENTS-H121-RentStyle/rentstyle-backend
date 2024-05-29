import admin from "../configs/firebase.js";

const tokenAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ success: false, message: "Authorization header is required" });
  }

  const tokenId = authHeader.split(' ')[1];
  if (!tokenId) {
    return res.status(400).json({ success: false, message: "TokenID is required" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(tokenId);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid TokenID" });
  }
};

export default tokenAuth;
