module.exports = {
  mongodb: {
    uri:
      process.env.DB_URI ||
      "mongodb://phamtrongbang2002xuantruong:09102002@ac-zd45ypj-shard-00-00.tdiz6li.mongodb.net:27017,ac-zd45ypj-shard-00-01.tdiz6li.mongodb.net:27017,ac-zd45ypj-shard-00-02.tdiz6li.mongodb.net:27017/nodejs-api-251?ssl=true&replicaSet=atlas-zd45ypj-shard-0&authSource=admin&retryWrites=true&w=majority",
  },
};
