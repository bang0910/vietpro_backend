const express = require("express");
const cookieParser = require("cookie-parser");
const { connectionRedis } = require("../common/init.redis");
connectionRedis();
const app = express();
const config = require("config");
app.use(cookieParser());
app.use(express.json());
app.use(
  "/asset/uploads/images",
  express.static(config.get("app.baseImageUrl"))
);
app.use(
  config.get("app.prefixApiVersion"),
  require(`${__dirname}/../routers/web`)
);

const router = (module.exports = app);
