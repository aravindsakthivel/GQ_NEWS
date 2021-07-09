const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql/schema");
const { Query } = require("./graphql/resolvers/query");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const { Mutation } = require("./graphql/resolvers/mutation");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(
  MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(`Error: ${err}`);
    } else {
      console.log("Database is connected");
    }
  }
);

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
  },
  context: ({ req }) => {
    req.headers.authorization =
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGU3ZDIyN2YyMTBjNTVkYTBlOWZiMGMiLCJlbWFpbCI6ImFyYXZpbmRAZy5jb20iLCJpYXQiOjE2MjU4MDUzNTEsImV4cCI6MTYyNjQxMDE1MX0.J1iS06qm44lDO2_k9YdmsoqBPFzcKNy6D_gukvYVHfw";
    return { req };
  },
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
