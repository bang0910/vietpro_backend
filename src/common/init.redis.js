const { createClient } = require("redis");
const client = createClient({
  url: " redis://default:ayzymmuXdxMdxhhnHtSc2i6yEc4ZIK20@redis-17198.c81.us-east-1-2.ec2.redns.redis-cloud.com:17198",
});
client.on("error", (error) => console.log("Redis client error", error));
const connectionRedis = () => {
  return client
    .connect()
    .then(() => console.log("Redis connected"))
    .catch((error) => console.log(error));
};
module.exports = {
  connectionRedis,
  redisClient: client,
};
