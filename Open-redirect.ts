import * as express from 'express';
import * as url from 'url';

const app = express();
const port = 3000;

const allowedHosts = ['example.com', 'another-allowed-host.com']; // Replace with your allowed hosts

app.get('/redirect', (req, res) => {
  const redirectUrl = req.query.url as string;

  // Validate the URL format
  if (!url.parse(redirectUrl).hostname) {
    res.status(400).send('Invalid URL');
    return;
  }

  // Check if the URL is from an allowed host
  if (!allowedHosts.includes(url.parse(redirectUrl).hostname)) {
    res.status(403).send('Forbidden');
    return;
  }

  // Secure redirection with validation and sanitization
  res.redirect(redirectUrl);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
