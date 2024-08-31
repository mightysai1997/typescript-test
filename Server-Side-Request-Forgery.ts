import * as http from 'http';
import { URL } from 'url';

const server = http.createServer((req, res) => {
    const urlParams = new URL(req.url || '', 'http://example.com').searchParams;
    const target = urlParams.get('target'); // Source

    // Validate the target input
    if (!target || typeof target !== 'string' || !isValidTarget(target)) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
        return;
    }

    // Construct the URL to avoid direct user control
    const safeUrl = `https://trusted.example.com/${encodeURIComponent(target)}/data/`;

    // Perform the HTTP request
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

// Function to validate target
function isValidTarget(target: string): boolean {
    try {
        const url = new URL(target, 'http://example.com');
        // Allow only requests to certain domains and paths
        const allowedDomains = ['trusted.example.com'];
        return allowedDomains.includes(url.hostname) && isValidPath(url.pathname);
    } catch {
        return false;
    }
}

// Function to validate the path
function isValidPath(path: string): boolean {
    // Allow only alphanumeric and specific characters
    const validPathPattern = /^[a-zA-Z0-9_\-\/]*$/;
    return validPathPattern.test(path);
}

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
