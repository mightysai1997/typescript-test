import express from 'express';
import expressGraphQL from 'express-graphql';
import { buildSchema } from 'graphql';
import depthLimit from 'graphql-depth-limit';

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

// Create the GraphQL server with depth limit middleware
app.use('/graphql', expressGraphQL({
    schema: vulnerableSchema,
    rootValue: root,
    graphiql: true, // Enable GraphQL interactive query editor
    validationRules: [depthLimit(5)] // Set the maximum query depth to 5
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
