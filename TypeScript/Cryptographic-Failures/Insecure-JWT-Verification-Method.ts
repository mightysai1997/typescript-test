/*
Type Of Vulnerability : Insecure JWT Verification Method
CWE : CWE-347
Discription : The provided code includes a decode() method for JWT, which decodes the token without verifying its validity or integrity. If the JWT is generated from an untrusted source, an attacker could manipulate the decoded data. Consequently, this data should not be considered secure for use or processing within the application. It is crucial to employ JWT verification methods to validate the token's structure and integrity, ensuring its authenticity and preventing potential security risks.
*/
import * as jwt from 'jsonwebtoken';

// This function verifies a JWT token without checking the signature
function verifyTokenWithoutSignature(token: string, secret: string): any {
  return jwt.decode(token, { complete: true }); //Source and Sink
}

// Example usage of the above function
const token = 'eyJhbGciOiAiSFMyNTYiLCAidHlwIjoiSldUIn0.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ';
const secret = 'insecure_secret_key';

const decodedToken = verifyTokenWithoutSignature(token, secret);

// If the signature verification is disabled, the decodedToken will not be null, regardless of the token's validity
if (decodedToken !== null) {
  console.log('Token is verified without signature verification.');
  console.log(decodedToken);
} else {
  console.log('Invalid token.');
}
