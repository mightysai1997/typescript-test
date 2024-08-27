/*
Sample code for vulnerability type : JWT 'none' Algorithm Supported
CWE : CWE-347
Description : The provided code utilizes JWT signing or verification with the 'none' algorithm, enabling potential attackers to create unencrypted JWT tokens that the application might accept. To prevent unintended behavior, it's crucial to specify and restrict the accepted algorithms.
*/

import * as jwt from 'jsonwebtoken';

// Vulnerable code that accepts JWTs signed with 'none' algorithm
const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, '', { algorithms: ['none'] }); //Source and Sink
    return decoded;
  } catch (error) {
    return null;
  }
};

// Example JWT signed with 'none' algorithm
const maliciousToken = 'eyJhbGciOiAiTk9ORSIsICJ0eXAiOiAiSldUIiB9.eyJzdWIiOiAiMTIzNDU2Nzg5MCIsICJpYXQiOiAxNTE2MjM5MDIyfQ.';

const result = verifyToken(maliciousToken);

if (result) {
  console.log('Token verified:', result);
} else {
  console.warn('Token verification failed.');
}
