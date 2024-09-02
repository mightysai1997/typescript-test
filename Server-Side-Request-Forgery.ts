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

        // Restrict to specific paths or patterns if necessary
        if (!allowedDomains.has(targetDomain)) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid target domain');
            return;
        }

        // Restrict requests to specific paths or patterns (e.g., only allowing certain paths)
        if (!targetURL.pathname.startsWith('/data/')) {
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end('Invalid target path');
            return;
        }

        // Safe: `target` is validated, domain is whitelisted, and path is restricted
        const options = {
            hostname: targetURL.hostname,
            port: targetURL.port,
            path: targetURL.pathname,
            method: 'GET',
            protocol: targetURL.protocol,
        };

        const request = http.request(options, response => { // Use `http.request` for more control
            let data = '';

            response.on('data', chunk => {
                data += chunk;
            });

            response.on('end', () => {
                // Process request response ...
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end(data);
            });
        });

        request.on('error', err => {
            res.writeHead(500, {'Content-Type': 'text/plain'});
            res.end('Internal Server Error');
            console.error('Error during HTTP request:', err);
        });

        request.end();
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
1. **Complete Input Validation**: The fixed code validates the `target` parameter to ensure it is a properly formatted URL and conforms to expected URL formats.
2. **Domain Whitelisting**: The fixed code includes a domain whitelist to ensure that requests are only allowed to predefined, safe domains.
3. **Path Restriction**: The fixed code restricts requests to specific paths or patterns to prevent unauthorized access.
4. **Safe Request Handling**: The code uses `http.request` instead of `http.get` for more control over request options.

By implementing thorough validation, domain whitelisting, path restrictions, and using more controlled request handling, the fixed code mitigates the risk of SSRF attacks.
*/
