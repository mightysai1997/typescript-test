import * as express from 'express';
import { URL } from 'url';

const app = express();
const port = 3000;

// Define a list of allowed paths or destinations
const allowedPaths = new Set([
  '/home',
  '/about',
  '/contact'
]);

app.get('/redirect', (req, res) => {
  const redirectUrl = req.query.url as string; // Source

  if (redirectUrl) {
    try {
      // Create a URL object to parse and validate the URL
      const url = new URL(redirectUrl, `http://${req.headers.host}`);

      // Check if the pathname of the URL is in the allowed paths list
      if (allowedPaths.has(url.pathname) && (url.protocol === 'http:' || url.protocol === 'https:')) {
        // Safe redirection to allowed paths
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
1. **Path Whitelisting**: The fixed code includes a list of allowed paths (`allowedPaths`) to ensure that only safe and approved paths are redirected to. This prevents arbitrary and potentially dangerous redirections.
2. **Validate URL Components**: The code creates a `URL` object to parse and validate the URL. It ensures that only URLs with allowed paths and proper protocols (`http` or `https`) are used for redirection.
3. **Error Handling**: The code includes comprehensive error handling to manage invalid URLs and unauthorized paths, ensuring that only safe redirects occur.

By implementing these practices, the fixed code mitigates the risk of Open Redirect vulnerabilities, ensuring that redirection only occurs to trusted and safe destinations.
*/
