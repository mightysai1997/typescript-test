/*
Sample code for vulnerability type : Sensitive Cookie in HTTPS Session Without 'Secure' Attribute
CWE : CWE-614
Discription: The provided code has the 'Secure' attribute of the cookie set to 'false'. To protect the cookie from man-in-the-middle attacks, it should be set to 'true'.
*/


import express from 'express';
import cookieParser from 'cookie-parser';
import https from 'https';
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
    const sensitiveData = 'sensitive information';
    res.cookie('sessionID', sensitiveData, { httpOnly: true, secure: false }); // BAD: Missing 'Secure' attribute in HTTPS session (Source and Sink)
    res.send('Cookie set successfully!');
});

const options = {
    key: fs.readFileSync('path/to/private-key.pem'), // Path to your private key file
    cert: fs.readFileSync('path/to/certificate.pem'), // Path to your certificate file
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
