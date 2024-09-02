import * as express from 'express';

const app = express();
const port = 3000;

// Define a whitelist of allowed domains for redirection
const allowedDomains = new Set([
  'example.com', // Replace with your trusted domains
  'another-trusted-domain.com'
]);

app.get('/redirect', (req, res) => {
  const redirectUrl = req.query.url as string; // Source

  if (redirectUrl) {
    try {
      // Create a URL object to parse and validate the URL
      const url = new URL(redirectUrl, `http://${req.headers.host}`);

      // Check if the hostname of the URL is in the allowed domains list
      if (allowedDomains.has(url.hostname)) {
        // Safe redirection to allowed domains
        res.redirect(redirectUrl);
      } else {
        // If not allowed, respond with a 400 Bad Request or similar error message
        res.status(400).send('Invalid redirect URL');
      }
    } catch (error) {
      // Handle any errors related to URL parsing
      res.status(400).send('Invalid URL format');
    }
  } else {
    res.status(400).send('No redirect URL provided');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

/*
Sample code for vulnerability type : Open Redirect
CWE : CWE-601
Description : The original code is vulnerable to Open Redirect. It directly uses user-supplied input to redirect users without validation, allowing attackers to redirect users to malicious or unintended sites.

Fix Summary:
1. **Whitelist Trusted Domains**: The fixed code uses a set of trusted domains (`allowedDomains`) to ensure that redirection only occurs to safe and approved locations. This prevents unauthorized redirections to potentially harmful sites.
2. **Validate URL**: The code creates a `URL` object to parse and validate the redirect URL. It then checks if the hostname is within the allowed domains list before performing the redirection.

By implementing these practices, the fixed code mitigates the risk of Open Redirect vulnerabilities, ensuring that redirection only occurs to trusted and safe destinations.
*/
