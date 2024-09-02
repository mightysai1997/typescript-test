/*
Sample code for vulnerability type : Unsafe Deserialization
CWE : CWE-502
Description : The original code is vulnerable to Unsafe Deserialization. It uses `node-serialize` to deserialize data from cookies, which can lead to execution of arbitrary code or other security issues if the data is tampered with by an attacker.

Fix Summary:
1. **Use JSON for Serialization/Deserialization**: The fixed code uses JSON for serialization and deserialization, which is a safer alternative to `node-serialize`.
2. **Implement Data Validation**: After deserializing the data, the code validates it against a predefined schema to ensure it adheres to expected format and constraints.
3. **Error Handling**: The code includes error handling for cases where deserialization fails or data validation issues occur, improving the robustness and security of the application.

By using JSON for serialization and deserialization and validating the data, the fixed code mitigates the risk of Unsafe Deserialization vulnerabilities.
*/
    

import express from 'express';
import cookieParser from 'cookie-parser';
import { Buffer } from 'buffer';
import { JSONSchema, validate } from 'jsonschema'; // Import jsonschema for validation
import escapeHtml from 'escape-html';

const app = express();
app.use(cookieParser());

// Define a schema to validate the profile object
const profileSchema: JSONSchema = {
    id: '/Profile',
    type: 'object',
    properties: {
        username: { type: 'string' },
        gender: { type: 'string' },
        age: { type: 'number' },
    },
    required: ['username'],
};

app.get('/', (req, res) => {
    if (req.cookies.profile) {            // Source
        try {
            const str = Buffer.from(req.cookies.profile, 'base64').toString();
            const obj = JSON.parse(str);

            // Validate the deserialized object against the schema
            const validation = validate(obj, profileSchema);
            if (!validation.valid) {
                throw new Error('Invalid profile data');
            }

            if (obj.username) {
                res.send(`Hello ${escapeHtml(obj.username)}`);
            } else {
                res.status(400).send('Invalid profile data');
            }
        } catch (error) {
            console.error('Error processing profile cookie:', error);
            res.status(400).send('Invalid profile data');
        }
    } else {
        const profile = {
            username: 'John',
            gender: 'Male',
            age: 35,
        };
        const serializedProfile = Buffer.from(JSON.stringify(profile)).toString('base64');
        res.cookie('profile', serializedProfile, {
            maxAge: 900000,
            httpOnly: true,
        });
        res.send('Profile cookie set');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

