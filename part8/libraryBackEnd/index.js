const { ApolloServer} = require('@apollo/server')
const { startStandaloneServer } =  require('@apollo/server/standalone');
const {expressMiddleware} = require('@apollo/server/express4');
const {ApolloServerPluginDrainHttpServer} = require('@apollo/server/plugin/drainHttpServer');
const {createServer} = require('http');
const express = require('express');
const {makeExecutableSchema} = require('@graphql-tools/schema');
const WebSocketServer = require('ws').WebSocketServer;
const {useServer} = require('graphql-ws/lib/use/ws');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongo } = require('mongoose');
require('dotenv').config()
const mongoose = require('mongoose');
const User = require('./models/user')

const jwt = require('jsonwebtoken')

const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')


mongoose.connect(process.env.MONGO_URL)
  .then(res => {
    console.log('connected to mongoose successfully');
  })
  .catch(e => {
    console.log(e);
  })

const start = async() => {
  const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express()
const httpServer = createServer(app)

const wsServer = new WebSocketServer({
  server: httpServer, 
  path: '/'
})

const serverCleanup = useServer({ schema }, wsServer);
const context = async ({req, res})=>{
  const auth = req ? req.headers.authorization : null
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    let decodedToken
    try {
      decodedToken = jwt.verify(
        auth.substring(7), process.env.JSON_SECRET
      )
    } catch(e) {
      console.log(e);
    }
    const currentUser = await User.findById(decodedToken.id)
    return { currentUser }
  } else 
    console.log("no authorized");

}
const server = new ApolloServer({
  schema,
  
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
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
 
})
await server.start();
app.use('/', cors(), bodyParser.json(),expressMiddleware(server,{context}));
const PORT = 4000
httpServer.listen(PORT, () =>
console.log(`Server is now running on http://localhost:${PORT}`)
)
}
start()