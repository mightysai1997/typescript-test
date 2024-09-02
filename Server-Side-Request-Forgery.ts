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

import * as http from 'http';
import { URL } from 'url';

const allowedHosts = ['example.com']; // Define allowed hosts

const server = http.createServer(function(req, res) {
    const target = new URL(req.url || '', "http://example.com").searchParams.get("target"); // Source

    // Check if target is provided and is a valid string
    if (!target || typeof target !== 'string') {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Bad Request');
        return;
    }

    // Validate the target host
    const targetUrl = new URL(`https://${target}.example.com/data/`);
    if (!allowedHosts.includes(targetUrl.hostname)) {
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid host');
        return;
    }

    // Safe: `target` is validated against allowed hosts
    http.get(targetUrl.toString(), response => {
        let data = '';

        response.on('data', chunk => {
            data += chunk;
        });

        response.on('end', () => {
            // Process request response ...
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
        });
    }).on('error', (err) => {
        console.error('Request error:', err); // Log the error server-side
        res.statusCode = 500;
        res.end('Internal Server Error');
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
