/*
Type Of Vulnerability : NoSQL Injection
CWE : CWE-943
Description : The provided code is vulnerable to NoSQL Injection. In this code, user input from the req.query.user and req.query.city parameters is directly used in the MongoDB query without proper validation or sanitization
*/

import { MongoClient, Collection } from 'mongodb';
import express from 'express';

const app = express();
const url = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URL

app.get('/users', (req, res) => {
    const query = { user: req.query.user, city: req.query.city }; // Source

    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(); // Get the database from the client

        // Access the 'users' collection
        const usersCollection: Collection = db.collection('users');

        // Perform the find operation with the provided query
        usersCollection.find(query).toArray((err, docs) => {        //Sink
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
