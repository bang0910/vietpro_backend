const express = require("express");
const app = express();
app.use(express.json());

app.use(require(`${__dirname}/../routers/web`));

const router = (module.exports = app);
