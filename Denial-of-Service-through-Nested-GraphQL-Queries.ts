/*
Type Of Vulnerability : Denial of Service (DoS) through Nested GraphQL Queries
CWE : CWE-400
Description : The provided code is vulnerable to Denial of Service (DoS) through deeply nested GraphQL queries. Attackers can exploit this by submitting complex, deeply nested queries, potentially exhausting server resources and leading to a DoS condition. To mitigate this risk, the `graphql-depth-limit` middleware is used to limit the depth of nested queries.
*/

import express from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';
import depthLimit from 'graphql-depth-limit'; // Import graphql-depth-limit middleware

const app = express();
const PORT = 3000;

// Vulnerable GraphQL schema
const vulnerableSchema = buildSchema(`
    type Query {
        user(id: ID!): User
    }

    type User {
        id: ID!
        name: String!
    }
`);

const usersDatabase = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    // ... more users
];

const root = {
    user: ({ id }: { id: string }) => {
        const user = usersDatabase.find(user => user.id === id);
        return user;
    }
};

app.use('/graphql', expressGraphQL({
    schema: vulnerableSchema,
    rootValue: root,
    graphiql: true, // Enable GraphQL interactive query editor

    // Fix applied: Add depth limit middleware to prevent deeply nested queries
    validationRules: [depthLimit(3)] // Limit the depth of nested queries to 3
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
