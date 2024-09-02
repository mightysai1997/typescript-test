import express, { Request, Response } from 'express';
import { execFileSync } from 'child_process';
import escape from 'lodash.escape'; // Use lodash.escape for HTML escaping
import rateLimit from 'express-rate-limit'; // Rate limiting

const app = express();

// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.',
});

app.use(limiter);

// Define a whitelist of allowed commands
const allowedCommands: { [key: string]: [string, string[]] } = {
    'listFiles': ['/bin/ls', ['-l']],
    'printDate': ['/bin/date', []],
    // Add more predefined commands here
};

app.get('/execute', (req: Request, res: Response) => {
    const cmdKey = req.query.cmd as string;

    // Validate command key
    if (!allowedCommands.hasOwnProperty(cmdKey)) {
        return res.status(400).send('Invalid command');
    }

    const [command, args] = allowedCommands[cmdKey];

    try {
        // Execute the predefined command safely
        const output = execFileSync(command, args, { encoding: 'utf8' });
        const escapedOutput = escape(output);

        // Limit the length of the output to prevent DoS attacks
        const maxLength = 10000;
        const limitedOutput = escapedOutput.slice(0, maxLength);

        res.send(`<pre>${limitedOutput}</pre>`);
    } catch (error) {
        console.error('Execution error:', error); // Log the error server-side
        res.status(500).send('An error occurred while executing the command.');
    }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
