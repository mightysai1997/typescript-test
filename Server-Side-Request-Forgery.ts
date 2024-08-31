import * as http from 'http';
import { URL } from 'url';

// List of allowed domains or IPs
const ALLOWED_DOMAINS = ['example.com'];

// Function to validate if the domain is allowed
function isAllowedDomain(target: string): boolean {
    try {
        const url = new URL(target);
        return ALLOWED_DOMAINS.includes(url.hostname);
    } catch {
        return false;
    }
}

const server = http.createServer((req, res) => {
    const target = new URL(req.url || '', 'http://example.com').searchParams.get('target'); // Source

    // Check if target is provided and is a valid string
    if (!target || typeof target !== 'string' || !isAllowedDomain(target)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
        return;
    }

    // Sanitize and validate target domain before making a request
    const safeUrl = `https://${target}.example.com/data/`;

    http.get(safeUrl, (response) => {  // Sink
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            // Process request response ...
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    }).on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        console.error(err);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
