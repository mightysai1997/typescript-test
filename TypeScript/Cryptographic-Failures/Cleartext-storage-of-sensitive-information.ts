/*CWE ID: CWE-312
Name: Cleartext Storage of Sensitive Information
Description: The vulnerability occurs when sensitive information is stored in cleartext. This means that the data is not encrypted or otherwise protected, making it accessible to anyone who can read the storage medium.*/

import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

const app = express();
const port = 3000;

app.use(express.json());

app.post('/save-password', (req: Request, res: Response) => {
    try {
        // **Source**: Extracting the password from the request body
        // This is where the data comes from (user input in the HTTP request)
        const { password } = req.body;

        // Check if the password is provided and is a string
        if (!password || typeof password !== 'string') {
            throw new Error('Password is required and must be a string');
        }

        // **Sink**: Writing the password to a file in cleartext
        // This is where the data is used/stored (vulnerable storage of sensitive information)
        const filePath = path.join(__dirname, 'passwords.txt');
        fs.appendFileSync(filePath, password + '\n');

>>>>>>> c52fd226d59fe5320e47da0fb207225e74346892
        res.send('Password saved successfully');
    } catch (error) {
        res.status(400).send(`Error: ${error.message}`);
    }
});
<<<<<<< HEAD

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
=======
>>>>>>> c52fd226d59fe5320e47da0fb207225e74346892

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
