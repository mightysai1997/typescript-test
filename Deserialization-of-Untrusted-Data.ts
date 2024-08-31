import express from 'express';
import cookieParser from 'cookie-parser';
import { Buffer } from 'buffer';
import escapeHtml from 'escape-html';

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.profile) { // Source
        try {
            // Decode and parse the cookie value as JSON
            const str = Buffer.from(req.cookies.profile, 'base64').toString();
            const obj = JSON.parse(str);

            // Validate the deserialized object
            if (obj && typeof obj.username === 'string') {
                res.send(`Hello ${escapeHtml(obj.username)}`);
            } else {
                res.status(400).send('Invalid profile data');
            }
        } catch (error) {
            console.error('Error parsing profile cookie:', error);
            res.status(400).send('Invalid profile data');
        }
    } else {
        const profile = {
            username: 'John',
            gender: 'Male',
            age: 35
        };
        const serializedProfile = Buffer.from(JSON.stringify(profile)).toString('base64');
        res.cookie('profile', serializedProfile, {
            maxAge: 900000,
            httpOnly: true
        });
        res.send('Profile cookie set');
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
