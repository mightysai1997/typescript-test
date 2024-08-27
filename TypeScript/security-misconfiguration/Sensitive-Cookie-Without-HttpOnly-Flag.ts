/*
Type Of Vulnerability : Sensitive Cookie Without 'HttpOnly' Flag
CWE : CWE-1004
*/

import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/set-cookie', (req, res) => {
  const sensitiveData = 'ThisIsSensitiveData123';

  // Set a cookie without the HttpOnly flag
  res.cookie('sensitiveCookie', sensitiveData, { secure: true }); //Source and Sink

  res.send('Cookie set successfully.');
});

app.get('/read-cookie', (req, res) => {
  const sensitiveCookie = req.cookies.sensitiveCookie;

  if (sensitiveCookie) {
    // Do something with the sensitive cookie data (e.g., log it)
    console.log('Received sensitive cookie data:', sensitiveCookie);

    res.send('Sensitive cookie data received.');
  } else {
    res.send('No sensitive cookie data found.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
