/*
Type Of Vulnerability : Open Redirect
CWE : CWE-601
Description : The provided code is vulnerable to Open Redirect, a common web security flaw. Open Redirect occurs when a web application redirects users to a specified external URL without proper validation or sanitization. Here, req.query.url is the source of the user-provided URL. The code takes the url parameter from the query string without proper validation or checking, assuming it's a valid URL. The res.redirect() function redirects the user to the URL provided in the redirectUrl variable. Since there's no validation, an attacker can craft a malicious URL and pass it as the url parameter.

*/

import * as express from 'express';

const app = express();
const port = 3000;

app.get('/redirect', (req, res) => {
  const redirectUrl = req.query.url as string; // Source

  // Insecure redirection, no validation or sanitization
  res.redirect(redirectUrl); //Sink
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
