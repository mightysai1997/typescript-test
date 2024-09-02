import express from 'express';

const app = express();
const PORT = 3000;

// Define a set of allowed operations as functions
const operations = {
    add: () => {
        // Implementation of add operation
        console.log('Add operation executed');
    },
    subtract: () => {
        // Implementation of subtract operation
        console.log('Subtract operation executed');
    },
    multiply: () => {
        // Implementation of multiply operation
        console.log('Multiply operation executed');
    },
    // Add more operations as needed
};

app.get('/perform-operation', (req, res) => {
    const operation: string | undefined = req.query.operation as string; // Source

    if (operation) {
        // Check if the operation is in the allowed set
        if (operations.hasOwnProperty(operation)) {
            try {
                // Call the operation function safely
                operations[operation]();
                res.send('OK');
            } catch (error) {
                res.status(500).send('Internal Server Error');
            }
        } else {
            res.status(400).send('Invalid operation');
        }
    } else {
        res.status(400).send('Operation parameter is required');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
