/*
Sample code for vulnerable type: Insecure TLS Configuration
CWE : CWE-327
Description : Setting the 'NODE_TLS_REJECT_UNAUTHORIZED' to '0' makes TLS connections and HTTPS requests insecure.
*/




import * as https from 'https';

// Insecure TLS Configuration vulnerability
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Source and Sink

https.get('https://example.com', (res) => {
    // Handle the response
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log(data.toString());
    });
}).on('error', (error) => {
    console.error('Error:', error.message);
});

