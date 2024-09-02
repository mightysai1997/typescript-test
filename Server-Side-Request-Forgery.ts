import * as http from 'http';
import { URL } from 'url';

// Define a list of allowed target domains (whitelist)
const allowedDomains = new Set([
    'example.com',
    'api.example.com',
    // Add other allowed domains as needed
]);

const server = http.createServer((req, res) => {
    try {
        const url = new URL(req.url || '', `http://${req.headers.host}`);
        const target = url.searchParams.get("target"); // Source

        // Validate target parameter
        if (!target || typeof target !== 'string') {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Bad Request');
            return;
        }

        // Ensure target URL is well-formed
        let targetURL;
        try {
            targetURL = new URL('https://' + target); // Validate URL format
        } catch (e) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid URL format');
            return;
        }

        // Validate target domain
        const targetDomain = targetURL.hostname;

        if (!allowedDomains.has(targetDomain)) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid target domain');
            return;
        }

        // Safe: `target` is validated and domain is whitelisted
        http.get(targetURL.toString() + "/data/", response => { // Sink
            let data = '';

            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                // Process request response ...
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            });
        }).on('error', err => {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            console.error('Error during HTTP request:', err);
        });
    } catch (err) {
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end('Internal Server Error');
        console.error('Unexpected error:', err);
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

/*
Sample code for vulnerability type : Server-Side Request Forgery (SSRF)
CWE : CWE-918
Description : The original code is vulnerable to Server-Side Request Forgery (SSRF). It directly uses the `target` parameter from the request URL to make an HTTP request without proper validation or sanitization. This can lead to unintended internal requests or exposure of sensitive data.

Fix Summary:
1. **Complete Input Validation**: The fixed code validates the `target` parameter to ensure it is a properly formatted string and conforms to expected URL formats.
2. **Domain Whitelisting**: The fixed code includes a domain whitelist to ensure that requests are only allowed to predefined, safe domains.
3. **Safe URL Parsing**: The code uses strict URL parsing to avoid malformed or malicious URLs and prevents potential bypasses.

By validating input thoroughly, whitelisting domains, and safely parsing URLs, the fixed code mitigates the risk of SSRF attacks.
*/
