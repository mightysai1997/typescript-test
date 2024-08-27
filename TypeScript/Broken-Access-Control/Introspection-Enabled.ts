/*
Sample code for vulnerability type : Introspection Enabled 
CWE : CWE-200
Description : In the given code, the introspection capability of GraphQL is enabled by default. Introspection allows clients to query the schema and understand the types, queries, mutations, and subscriptions available in the GraphQL API. While introspection is a powerful tool for developers and tools, it can also be a potential security risk if exposed to untrusted parties, as it can reveal sensitive information about the GraphQL API's structure and implementation. 
*/

import depthLimit from 'graphql-depth-limit'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema'


const app = express() 
// depthlimit prevents nested queries
app.use('/graphql', graphqlHTTP((req, res) => ({  //Source and Sink
  schema,
  validationRules: [ depthLimit(10) ]
})))
