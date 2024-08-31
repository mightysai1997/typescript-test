import * as crypto from 'crypto';

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
    // Secure random value generation
    const secureRandomValue = generateSecureRandomValue(16); // 16 bytes for a hex string
    const secureResult = useSecureRandomValue(secureRandomValue);
    console.log('Secure Result:', secureResult);
})();
