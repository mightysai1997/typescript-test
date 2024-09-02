import { MongoClient, Collection } from 'mongodb';
import express from 'express';

const app = express();
const url = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URL

app.get('/users', (req, res) => {
    // Sanitize and validate user input
    const user = req.query.user ? String(req.query.user).trim() : '';
    const city = req.query.city ? String(req.query.city).trim() : '';

    // Construct a sanitized query
    const query = {
        user: { $regex: new RegExp(`^${user}$`, 'i') },
        city: { $regex: new RegExp(`^${city}$`, 'i') }
    };

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
1. **Input Sanitization**: The fixed code sanitizes and validates user input by trimming and converting it to a string to ensure it’s in a safe format before constructing the query.
2. **Use of Regular Expressions**: The fixed code uses MongoDB's `$regex` operator to safely match user input. This approach allows for controlled, pattern-based querying while mitigating the risk of injection.

By sanitizing inputs and using regular expressions for safe querying, the fixed code mitigates the risk of NoSQL injection.
*/
