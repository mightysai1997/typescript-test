/*
Sample code for vulnerable type: Use of Insufficiently Random Values
CWE : CWE-330
Description : A value generated with an insecure random number generator (random) is used as a cipher key (in crypto.createHmac). Generate the value with a cryptographically strong random number generator and do not hardcode it in source code.
*/

import * as crypto from 'crypto';

// Source: Insufficiently random value generation
function generateInsecureRandomValue() {
    return Math.random(); // NOT SECURE: Math.random() is not suitable for cryptographic use ---> Source
}

// Sink: Use of the insufficiently random value in a cryptographic operation
function useInsecureRandomValue(input: number) {
    const hmac = crypto.createHmac('sha256', input.toString()); // Insecure usage  ---> Sink
    return hmac.digest('hex');
}

// Secure random value generation
function generateSecureRandomValue(length: number): string {
    const secureRandomBytes = crypto.randomBytes(length);
    return secureRandomBytes.toString('hex');
}

// Sink: Use of the secure random value in a cryptographic operation
function useSecureRandomValue(input: string) {
    const hmac = crypto.createHmac('sha256', input); // Secure usage
    return hmac.digest('hex');
}

// Example usage
(function () {
    // Insufficiently random value generation
    const insecureRandomValue = generateInsecureRandomValue();
    const insecureResult = useInsecureRandomValue(insecureRandomValue);
    console.log('Insecure Result:', insecureResult);

    // Secure random value generation
    const secureRandomValue = generateSecureRandomValue(16); // 16 bytes for a hex string
    const secureResult = useSecureRandomValue(secureRandomValue);
    console.log('Secure Result:', secureResult);
})();
