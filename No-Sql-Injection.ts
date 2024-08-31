import { MongoClient, Collection } from 'mongodb';
import express from 'express';

const app = express();
const url = 'mongodb://localhost:27017/mydatabase'; // Replace with your MongoDB connection URL

// Helper function to validate input
function validateQueryParam(param: any): string | null {
    if (typeof param === 'string' && /^[a-zA-Z0-9_]+$/.test(param)) {
        return param;
    }
    return null;
}

app.get('/users', (req, res) => {
    // Validate and sanitize query parameters
    const user = validateQueryParam(req.query.user);
    const city = validateQueryParam(req.query.city);

    if (!user || !city) {
        res.status(400).send('Invalid query parameters');
        return;
    }

    const query = { user: user, city: city }; // Safe query object

    MongoClient.connect(url, (err, client) => {
        if (err) {
            console.error('Error connecting to MongoDB:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const db = client.db(); // Get the database from the client

        // Access the 'users' collection
        const usersCollection: Collection = db.collection('users');

        // Perform the find operation with the validated query
        usersCollection.find(query).toArray((err, docs) => {        // Sink
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
