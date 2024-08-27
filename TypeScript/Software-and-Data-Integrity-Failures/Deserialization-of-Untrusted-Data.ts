/*
Type Of Vulnerability : Deserialization of Untrusted Data
CWE : CWE-502
Discription : Unsanitized input from cookies is passed into node-serialize.unserialize, where it is utilized for deserializing an object. This can potentially lead to an Unsafe Deserialization vulnerability.
*/

import express from 'express';
import cookieParser from 'cookie-parser';
import { Buffer } from 'buffer';
import { unserialize } from 'node-serialize';
import escapeHtml from 'escape-html';

const app = express();
app.use(cookieParser());

app.get('/', (req, res) => {
    if (req.cookies.profile) {            //Source
        const str = Buffer.from(req.cookies.profile, 'base64').toString();
        const obj = unserialize(str);     //Sink
        if (obj.username) {
            res.send(`Hello ${escapeHtml(obj.username)}`);
        }
    } else {
        const profile = {
            username: 'John',
            gender: 'Male',
            Age: 35
        };
        const serializedProfile = Buffer.from(JSON.stringify(profile)).toString('base64');
        res.cookie('profile', serializedProfile, {
            maxAge: 900000,
            httpOnly: true
        });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
