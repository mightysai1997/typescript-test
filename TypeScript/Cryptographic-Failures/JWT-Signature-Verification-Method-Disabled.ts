/*
sample code for vulnerability type : JWT Signature Verification Method Disabled
CWE : CWE-347
Description : A JWT signature validation check to validate the 'expiration' claim has been disabled. If the JWT has originated from an untrusted source, it could be crafted by an attacker and should be properly validated before being processed within the application. Always use JWT verification checks to validate the structure and integrity of a token.
*/

import * as jwt from 'jsonwebtoken';

// This function verifies a JWT without checking its signature (vulnerable)
function verifyToken(token: string, secret: string): any | null {
    try {
        const decoded = jwt.verify(token, secret, { ignoreExpiration: true }) as any; //Source and Sink
        return decoded;
    } catch (err) {
        // Handle verification errors
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

// Example usage of the vulnerable verifyToken function
const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
const secret: string = 'insecureSecret'; // Insecure secret key

// Verify the token (vulnerable method)
const decodedToken = verifyToken(token, secret);

// Process the decoded token (if valid)
if (decodedToken) {
    console.log('Token verified. User ID:', decodedToken.sub);
    // Proceed with further actions using the decoded token data
} else {
    console.log('Invalid token. Access denied.');
}
