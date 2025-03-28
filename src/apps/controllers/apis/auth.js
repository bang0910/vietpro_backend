const CustomerModel = require("../../models/customer");
const TokenModel = require("../../models/token");
const { jwtDecode } = require("jwt-decode");
const { redisClient } = require("../../../common/init.redis");
const jwt = require("jsonwebtoken");
const config = require("config");
//
const generateAccessToken = async (customer) => {
  return jwt.sign({ email: customer.email }, config.get("app.jwtAccessKey"), {
    expiresIn: "1h",
  });
};
//
const generateRefreshToken = async (customer) => {
  return jwt.sign({ email: customer.email }, config.get("app.jwtRefreshKey"), {
    expiresIn: "1d",
  });
};
//
const setTokenBlacklist = async (token) => {
  const decoded = jwtDecode(token);
  if (decoded.exp > Date.now() / 1000) {
    redisClient.set(token, token, {
      EXAT: decoded.exp,
    });
  }
};
exports.registerCustomer = async (req, res) => {
  try {
    const { body } = req;
    const { email, phone } = body;
    const isEmail = await CustomerModel.findOne({ email });
    const isPhone = await CustomerModel.findOne({ phone });
    if (!isEmail)
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    if (!isPhone)
      return res.status(400).json({
        status: "fail",
        message: "Phone already exists",
      });
    const customer = {
      fullName: body.fullName,
      email,
      password: body.password,
      phone,
      address: body.address,
    };
    await CustomerModel(customer).save();
    return res.status(200).json({
      status: "success",
      message: "customer created successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isEmail = await CustomerModel.findOne({ email });
    if (!isEmail) return res.status(400).json("Email not valid!");
    const isPassword = isEmail.password === password;
    if (!isPassword) return res.status(400).json("Password not valid!");
    if (isEmail && isPassword) {
      //generate token jsonwetoken
      const accessToken = await generateAccessToken(isEmail);
      const refreshToken = await generateRefreshToken(isEmail);
      const isToken = await TokenModel.findOne({ customerId: isEmail._id });
      if (isToken) {
        setTokenBlacklist(isToken.accessToken);
        setTokenBlacklist(isToken.refreshToken);
        //delete token
        await TokenModel.deleteOne({ customerId: isEmail._id });
      }
      await TokenModel({
        customerId: isEmail._id,
        accessToken,
        refreshToken,
      }).save();
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
      });
      const { password, ...others } = isEmail._doc;
      return res.status(200).json({
        customer: others,
        accessToken,
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json("authentication required");
    ///ktra redis
    const dirtyToken = await redisClient.get(refreshToken);
    if (dirtyToken) return res.status(401).json("token expired");
    jwt.verify(
      refreshToken,
      config.get("app.jwtRefreshKey"),
      async (error, decoded) => {
        if (error) return res.status(401).json("authentication required");
        const newAccessToken = await generateAccessToken(decoded);
        //
        await TokenModel.updateOne(
          { refreshToken },
          { $set: { accessToken: newAccessToken } }
        );
        return res.status(200).json({
          accessToken: newAccessToken,
        });
      }
    );
  } catch (error) {
    return res.status(500).json(error);
  }
};
exports.logoutCustomer = async (req, res) => {
  try {
    ///
    const { accessToken } = req;
    const token = await TokenModel.findOne({ accessToken });
    setTokenBlacklist(token.accessToken);
    setTokenBlacklist(token.refreshToken);
    await TokenModel.deleteOne({ accessToken });
    return res.status(200).json("logged out successfully");
  } catch (error) {
    return res.status(500).json(error);
  }
};
