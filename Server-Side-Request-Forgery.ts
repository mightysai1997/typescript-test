/*
Sample code for vulnerability type : Server-Side Request Forgery (SSRF)
CWE : CWE-918
Description : The original code is vulnerable to Server-Side Request Forgery (SSRF). It directly uses the `target` parameter from the request URL to make an HTTP request without validating or sanitizing it. An attacker could exploit this by providing a target URL that could lead to unintended internal requests or sensitive information leakage.

Fix Summary:
1. **Input Validation**: The fixed code validates the `target` parameter to ensure it is a valid string and matches a predefined format.
2. **Domain Whitelisting**: The fixed code checks that the `target` domain is within a whitelist of allowed domains, preventing unauthorized or malicious domains from being accessed.

By implementing strict input validation and domain whitelisting, the fixed code mitigates the risk of SSRF attacks.
*/


import * as http from 'http';
import { URL } from 'url';

// Define a list of allowed target domains (whitelist)
const allowedDomains = new Set([
    'example.com',
    'api.example.com',
    // Add other allowed domains as needed
]);

const server = http.createServer((req, res) => {
    const url = new URL(req.url || '', `http://${req.headers.host}`);
    const target = url.searchParams.get("target"); // Source

    // Validate target parameter
    if (!target || typeof target !== 'string') {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request');
        return;
    }

    // Validate target domain
    const targetURL = new URL('https://' + target);
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
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

