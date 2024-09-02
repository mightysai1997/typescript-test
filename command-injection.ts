/*
Sample code for Vulnerable type : Command Injection
CWE : CWE-78
Description : The original code is vulnerable to command injection. It directly uses the `cmd` variable obtained from `req.query.cmd` without proper validation or sanitization. This variable is then passed to `execSync`, which executes the command in the underlying operating system. An attacker could exploit this by injecting arbitrary commands, potentially gaining unauthorized access or causing system harm.

Fix Summary:
1. **Command Whitelisting**: The fixed code includes a predefined set of safe commands in the `allowedCommands` object. Only these commands can be executed, preventing arbitrary or malicious commands from being run.
2. **Use `execFileSync`**: The fixed code uses `execFileSync` instead of `execSync`. `execFileSync` runs commands directly without invoking the shell, reducing the risk of command injection.

By implementing command whitelisting and using `execFileSync`, the fixed code mitigates the risk of command injection.
*/


import express, { Request, Response } from 'express';
import { execFileSync } from 'child_process';

const app = express();

// Define a whitelist of allowed commands
const allowedCommands: { [key: string]: [string, string[]] } = {
    'listFiles': ['/bin/ls', ['-l']],
    'printDate': ['/bin/date', []],
    // Add more predefined commands here
};

app.get('/execute', (req: Request, res: Response) => {
    // Extract the command key from the query parameters
    const cmdKey = req.query.cmd as string;

    // Validate command key
    if (!allowedCommands.hasOwnProperty(cmdKey)) {
        // If the command is not in the whitelist, return a 400 Bad Request
        return res.status(400).send('Invalid command');
    }

    // Retrieve the command and arguments from the whitelist
    const [command, args] = allowedCommands[cmdKey];

    try {
        // Execute the predefined command safely using execFileSync
        const output = execFileSync(command, args, { encoding: 'utf8' });

        // Send the command output as a response
        res.send(`<pre>${output}</pre>`);
    } catch (error) {
        // Log errors server-side and provide a generic error message to the client
        console.error('Execution error:', error);
        res.status(500).send('An error occurred while executing the command.');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

