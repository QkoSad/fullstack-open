const { ApolloServer } = require('@apollo/server')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')
const { makeExecutableSchema } = require('@graphql-tools/schema')

const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')

const http = require('http')
const express = require('express')
const cors = require('cors')

const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require("./models/user");
const typeDefs = require("./schema");
const resolvers = require("./resolver");

require("dotenv").config();

mongoose.set("strictQuery", false);

const MONGODB_URI = process.env.MONGODB_URI;

console.log("connecting to ", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connect to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MONGODG:", err.message);
  });

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const wsServer = new WebSocketServer({
    server: httpServer,
    paht: "/",
  });

  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(
    "/",
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null;
        if (auth && auth.startsWith("Bearer ")) {
          const decodedToken = jwt.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          );
          const currentUser = await User.findById(decodedToken.id);
          return { currentUser };
        }
      },
    })
  );
  const PORT = 4000;
  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  );
};
start();
/*
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(
        auth.substring(7),
        process.env.JWT_SECRET
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});*/
