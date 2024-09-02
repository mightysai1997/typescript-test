import express from 'express';

const app = express();
const PORT = 3000;

// Define a whitelist of allowed regex patterns
const safePatterns: { [key: string]: RegExp } = {
    'email': /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // Match a valid email address
    'number': /^\d+$/,                   // Match a number
    'alpha': /^[a-zA-Z]+$/               // Match alphabetic characters
};

app.get('/lookup', (req, res) => {
    const patternKey: string | undefined = req.query.pattern as string; // Use pattern keys
    const inputData: string | undefined = req.query.data as string;

    if (patternKey && inputData) {
        // Check if the patternKey is in the whitelist of safe patterns
        const regex = safePatterns[patternKey];
        if (regex) {
            try {
                // Use the safe regex pattern
                if (regex.test(inputData)) {
                    res.send("It's a Match!");
                } else {
                    res.send("Not a Match!");
                }
            } catch (error) {
                res.status(400).send("Error processing the regular expression");
            }
        } else {
            res.status(400).send("Invalid Pattern Key");
        }
    } else {
        res.status(400).send("Invalid Input");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/*
Sample code for vulnerability type : Regular Expression Denial of Service (ReDoS)
CWE : CWE-1333
Description : The original code is vulnerable to Regular Expression Denial of Service (ReDoS). It allows user-supplied regex patterns, which could lead to inefficient regex operations and potential denial of service attacks.

Fix Summary:
1. **Whitelist Safe Patterns**: The fixed code uses a predefined set of safe regex patterns (`safePatterns`). Only these patterns are allowed, reducing the risk of inefficient regex operations and potential ReDoS attacks.
2. **Validate Pattern Key**: The code ensures that only keys for predefined safe patterns are used, preventing arbitrary or potentially harmful regex patterns from being executed.

By implementing these practices, the fixed code mitigates the risk of Regular Expression Denial of Service vulnerabilities associated with inefficient or unsafe regex patterns.
*/
