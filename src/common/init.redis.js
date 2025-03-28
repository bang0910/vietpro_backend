const { createClient } = require("redis");
const client = createClient({
  url: "redis://default:77fz5OgZHPK63zDIuQy9PiPkMgPEfl0c@redis-12960.c98.us-east-1-4.ec2.redns.redis-cloud.com:12960",
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
