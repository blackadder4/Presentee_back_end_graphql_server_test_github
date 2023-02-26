//local express test server to build graphql and queries
const express = require('express');
const app = express();
//const expressGraphQL = require('express-graphql');
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema');
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} = require('graphql')

/*const schema = new GraphQLSchema({
  query : new GraphQLObjectType({
    name: 'Querytest',
    fields: () => ({
      message: { 
        type: GraphQLString,
        resolve : () => 'Local Query is working'
    }
    })
  })
})*/

app.get('/', (req, res) => {
  res.send('TEST SERVER 1 connect to graphql back end')
})
app.use('/graphql', expressGraphQL({
  schema : schema,
  graphiql : true
}))

app.listen(5000, () => {
  console.log('Server started on port 5000')
})
