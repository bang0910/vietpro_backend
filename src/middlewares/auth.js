const jwt = require("jsonwebtoken");
const config = require("config");
const { redisClient } = require("../common/init.redis");
exports.verifyAuthenticationCustomer = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const accessToken = authorization.split(" ")[1];
      const dirtyToken = await redisClient.get(accessToken);
      if (dirtyToken) {
        return res.status(401).json("token expired");
      }
      jwt.verify(
        accessToken,
        config.get("app.jwtAccessKey"),
        (error, decoded) => {
          if (error) {
            if (error.name === "TokenExpiredError")
              //token het han
              res.status(401).json("token expired");
            return res.status(401).json("authentication required2");
          }
          ///
          req.accessToken = accessToken;
          next();
        }
      );
    } else {
      return res.status(401).json("authentication required1");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
