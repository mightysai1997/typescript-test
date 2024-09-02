import { MongoClient, Collection } from 'mongodb';
import express from 'express';

// Create an Express application
const app = express();
const url = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URL

// Function to validate and sanitize input
const sanitizeInput = (input: any): string => {
    // Ensure the input is a string and escape special characters
    if (typeof input === 'string') {
        return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special characters
    }
    return '';
};

app.get('/users', (req, res) => {
    // Sanitize user input
    const user = sanitizeInput(req.query.user as string);
    const city = sanitizeInput(req.query.city as string);

    // Construct a query object with sanitized input
    const query: { [key: string]: any } = {};
    if (user) {
        query.user = user; // Directly assign if sanitized
    }
    if (city) {
        query.city = city; // Directly assign if sanitized
    }

    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(); // Get the database from the client

        // Access the 'users' collection
        const usersCollection: Collection = db.collection('users');

        // Perform the find operation with the sanitized query
        usersCollection.find(query).toArray((err, docs) => {
            if (err) {
                console.error('Error executing MongoDB query:', err);
                res.status(500).send('Internal Server Error');
                client.close(); // Close the MongoDB connection in case of an error
                return;
            }

            // Process the query results (docs) as needed
            res.json(docs);

            client.close(); // Close the MongoDB connection after processing the request
        });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

/*
Sample code for Vulnerable type : NoSQL Injection
CWE : CWE-943
Description : The original code is vulnerable to NoSQL Injection. It directly uses the `req.query.user` and `req.query.city` parameters to construct a MongoDB query without proper validation or sanitization. This can allow an attacker to inject malicious queries, potentially leading to unauthorized access or exposure of sensitive data.

Fix Summary:
1. **Input Validation and Sanitization**: The fixed code includes a `sanitizeInput` function that ensures user input is safely formatted and free from special characters that could be used for injection. This reduces the risk of NoSQL Injection.
2. **Safe Query Construction**: The fixed code constructs queries using sanitized input, ensuring that user input cannot affect query structure or operations.

By implementing input sanitization and constructing queries safely, the fixed code mitigates the risk of NoSQL Injection.
*/
