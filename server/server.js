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
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(`Server is up and running at ${PORT}`);
});
