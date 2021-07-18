const fs = require('fs');
const path = require('path');
const { buildSchema } = require('graphql');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = buildSchema(`
  type Query {
    hello: String
  }
`);

const root = {
  hello: () => {
    return 'Hello World!'
  }
}

const app = express();

app.use('/api', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));
const processReq = (res, url) => {
  const file = __dirname + url;
  fs.readFile(file, (err, data) => {;
    if (err) {
      res.status(500).json(err);
    }
    res.status(200).send(data.toString());
  });
}
app.get(/dist\/app.js/, (req, res) => {
  processReq(res, '/dist/app.js');
});
app.get('/', (req, res) => {
  processReq(res, '/index.html');
});
app.listen(80);