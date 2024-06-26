const jwt = require("jsonwebtoken");
require("dotenv").config();

const createToken = (type, user) => {
  const privateKey = process.env.PRIVATE_KEY;
  const { email, id: uid } = user;
  const tokenData = {
    accessToken: { email, uid },
    refreshToken: { uid },
  };
  const tokenConfig = {
    accessToken: {
      expiresIn: process.env.ACCESSTOKEN_LIFETIME,
      issuer: process.env.ACCESSTOKEN_ISSUER,
    },
    refreshToken: {
      expiresIn: process.env.REFRESHTOKEN_LIFETIME,
      issuer: process.env.REFRESHTOKEN_ISSUER,
    },
  };

  const token = jwt.sign(tokenData[type], privateKey, tokenConfig[type]);
  return token;
};
module.exports = { createToken };
