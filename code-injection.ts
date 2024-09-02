/*
Sample code for vulnerability type : Code Injection
CWE : CWE-94
Description : The original code is vulnerable to Code Injection. It directly uses the `operation` parameter from the HTTP request to construct a JavaScript code string for `eval`. This allows an attacker to inject and execute arbitrary code, which could lead to severe security issues.

Fix Summary:
1. **Remove `eval` Usage**: The fixed code replaces `eval` with a predefined set of allowed operations stored in an `operations` object.
2. **Predefined Operation Mapping**: Only operations that are explicitly defined in the `operations` object are executed. This eliminates the risk of arbitrary code execution.
3. **Input Validation**: The code checks if the `operation` parameter matches one of the predefined keys in the `operations` object before execution.

By using a predefined set of operations and directly calling the corresponding functions, the fixed code mitigates the risk of Code Injection attacks.
*/

import express from 'express';

const app = express();
const PORT = 3000;

// Define a set of allowed operations as functions
const operations = {
    product_add: () => {
        console.log('Performing addition');
        // Add your operation logic here
    },
    product_subtract: () => {
        console.log('Performing subtraction');
        // Add your operation logic here
    },
    // Add more predefined operations as needed
};

app.get('/perform-operation', (req, res) => {
    const operation: string | undefined = req.query.operation as string; // Source

    if (operation && operations[operation]) {
        try {
            // Safely call the function corresponding to the operation
            operations[operation]();
            res.send('OK');
        } catch (error) {
            console.error('Error executing operation:', error);
            res.status(500).send('Internal Server Error');
        }
    } else {
        res.status(400).send('Invalid operation');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


