import express, { Request, Response } from 'express';
import { execSync } from 'child_process';

// Create an Express application
const app = express();

// Define a whitelist of allowed commands
const allowedCommands: { [key: string]: string } = {
    'list': 'ls -l',
    'currentDir': 'pwd',
    // Add other safe commands here
};

// Define a route that accepts a command via query parameter
app.get('/execute', (req: Request, res: Response) => {
    // Extract the command from the query parameters
    const cmdKey = req.query.cmd as string;

    // Check if the provided command is in the whitelist
    const cmd = allowedCommands[cmdKey];
    
    if (cmd) {
        try {
            // Execute the command using execSync
            const output = execSync(cmd, { encoding: 'utf8' });
            res.send(`<pre>${output}</pre>`); // Display the output of the command
        } catch (error) {
            res.status(500).send(`Error: ${(error as Error).message}`);
        }
    } else {
        // Command not allowed
        res.status(400).send('Invalid command');
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
