/*
Sample code for vulnerability type : Code Injection
CWE : CWE-94
Discription : The provided code contains a Code Injection vulnerability due to unsanitized input from an HTTP parameter flowing into eval. This allows the input to be executed as JavaScript code, potentially leading to malicious code execution.
*/


import express from 'express';

const app = express();
const PORT = 3000;

app.get('/perform-operation', (req, res) => {
    const operation: string | undefined = req.query.operation as string; //Source

    if (operation) {
        try {
            // Assuming there are functions like product_add, product_subtract, etc.
            // Make sure to sanitize the 'operation' input to prevent code injection vulnerabilities
            eval(`product_${operation}()`); //Sink
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
