import express, { Request, Response } from 'express';
import { execFileSync } from 'child_process'; // Use execFileSync for safer command execution
import { escape } from 'html-escaper'; // Use a library to escape HTML

// Create an Express application
const app = express();

// Define a route that executes a safe, predefined command
app.get('/execute', (req: Request, res: Response) => {
    // Extract the command name from the query parameters
    const cmdName = req.query.cmd as string;

    // Define a list of allowed commands with their file paths and arguments
    const allowedCommands: { [key: string]: [string, string[]] } = {
        'listFiles': ['/bin/ls', ['-l']],
        'printDate': ['/bin/date', []],
        // Add more predefined commands here
    };

    // Validate the command name
    if (!allowedCommands.hasOwnProperty(cmdName)) {
        return res.status(400).send('Invalid command');
    }

    // Get the command and arguments from the allowed list
    const [command, args] = allowedCommands[cmdName];

    try {
        // Execute the predefined command using execFileSync
        const output = execFileSync(command, args, { encoding: 'utf8' });

        // Escape HTML to prevent XSS attacks
        const escapedOutput = escape(output);

        // Limit the length of the output to prevent large responses
        const maxLength = 10000; // e.g., 10 KB
        const limitedOutput = escapedOutput.slice(0, maxLength);

        res.send(`<pre>${limitedOutput}</pre>`); // Display the output of the command
    } catch (error) {
        res.status(500).send(`Error: ${(error as Error).message}`);
    }
});

// Start the server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
