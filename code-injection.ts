import express from 'express';

const app = express();
const PORT = 3000;

// Define allowed operations and their corresponding functions
const operations = {
    add: () => product_add(),
    subtract: () => product_subtract(),
    // Add other operations as needed
};

// Example functions for demonstration
function product_add() {
    console.log('Product added');
}

function product_subtract() {
    console.log('Product subtracted');
}

app.get('/perform-operation', (req, res) => {
    const operation: string | undefined = req.query.operation as string; // Source

    if (operation && operations[operation]) {
        try {
            operations[operation](); // Safe function call
            res.send('OK');
        } catch (error) {
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Invalid operation');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
