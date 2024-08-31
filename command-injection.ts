import express, { Request, Response } from 'express';
import { execSync } from 'child_process';

// Create an Express application
const app = express();

// Define a route that executes a safe, predefined command
app.get('/execute', (req: Request, res: Response) => {
    // Extract the command name from the query parameters
    const cmdName = req.query.cmd as string;

    // Define a list of allowed commands
    const allowedCommands: { [key: string]: string[] } = {
        'listFiles': ['ls', '-l'],
        'printDate': ['date'],
        // Add more predefined commands here
    };

    // Validate the command name
    if (!allowedCommands.hasOwnProperty(cmdName)) {
        return res.status(400).send('Invalid command');
    }

    // Get the command to execute from the allowed list
    const command = allowedCommands[cmdName];

    try {
        // Execute the predefined command using execSync
        const output = execSync(command.join(' '), { encoding: 'utf8' });
        res.send(`<pre>${output}</pre>`); // Display the output of the command
    } catch (error) {
        res.status(500).send(`Error: ${(error as Error).message}`);
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
