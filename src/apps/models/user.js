const mongoose = require("../../common/init.mongo");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    default: true,
  },
  password: {
    type: String,
    default: true,
  },
  role: {
    type: String,
    default: true,
  },
  full_name: {
    type: String,
    default: true,
  },
});
const UserModel = mongoose.model("Users", userSchema, "users");
module.exports = UserModel;
