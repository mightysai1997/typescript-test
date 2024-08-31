import * as express from 'express';

const app = express();
const port = 3000;

// Define a list of allowed domains
const allowedDomains = new Set([
  'example.com',
  'mywebsite.com'
]);

// Helper function to validate if the URL is in an allowed domain
function isValidRedirect(redirectUrl: string): boolean {
  try {
    const parsedUrl = new URL(redirectUrl);
    return allowedDomains.has(parsedUrl.hostname);
  } catch (e) {
    return false;
  }
}

app.get('/redirect', (req, res) => {
  const redirectUrl = req.query.url as string; // Source

  // Single line fix: Validate the redirect URL before using it
  if (redirectUrl && isValidRedirect(redirectUrl)) {
    res.redirect(redirectUrl); // Sink
  } else {
    res.status(400).send('Invalid redirect URL');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
