/*
Sample code for Vulnerable type : Command Injection
CWE : CWE-78
Description : The provided code is vulnerable to command injection. In the given code snippet, the cmd variable is directly obtained from the req.query object without proper validation or sanitization. It is then passed directly to the execSync function, which executes the command specified in cmd in the underlying operating system. This can allow an attacker to inject arbitrary commands, leading to potential security risks and unauthorized access to the system
*/

import express, { Request, Response } from 'express';
import { execSync } from 'child_process';

// Create an Express application
const app = express();

// Define a route that accepts a command via query parameter
app.get('/execute', (req: Request, res: Response) => {
    // Extract the command from the query parameters
    const cmd = req.query.cmd as string;

    try {
        // Execute the command using execSync, which is vulnerable to command injection
        const output = execSync(cmd, { encoding: 'utf8' });
        res.send(`<pre>${output}</pre>`); // Display the output of the command
    } catch (error) {
        res.status(500).send(`Error: ${(error as Error).message}`);
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
