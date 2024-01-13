const { serverError, jwtError } = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const privateKey = process.env.PRIVATE_KEY;

const authenticateToken = async (req, res, next) => {
  try {
    const { access_token: accessToken } = req.cookies;
    // 추후, 프론트단까지 구현완료되면 헤더에서 access token 값을 추출할 예정(=req.headers.authorization)

    const { uid } = jwt.verify(accessToken, privateKey);
    if (uid) {
      req.user = { id: uid };
      return next();
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "로그인이 필요합니다. 로그인 후 이용해주세요." });
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      jwtError(res, err);
    } else {
      serverError(res, err);
    }
  }
};

module.exports = authenticateToken;