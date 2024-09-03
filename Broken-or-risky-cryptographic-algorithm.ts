/*
Sample code for vulnerability type: Use of a Broken or Risky Cryptographic Algorithm
CWE: CWE-327
Description: The original code was using AES-256-GCM, which is a strong encryption algorithm. However, proper management of the key, IV, and authentication tag is crucial. Ensuring these elements are handled securely and correctly mitigates potential vulnerabilities related to cryptographic practices.

Fix Summary:
1. **Use AES-256-GCM**: The fixed code uses AES-256-GCM for encryption, which is strong and secure.
2. **Proper Key Management**: Secure key generation and management practices are essential but are not demonstrated in the example.
3. **Secure Storage/Transmission of IV and Tag**: IV and authentication tag must be stored or transmitted securely alongside the ciphertext to ensure the integrity and security of the encrypted data.
4. **Decryption**: A proper decryption function is provided to show how to use the IV, tag, and key to decrypt the data, ensuring the encryption/decryption process is complete.

By following these practices, the code adheres to modern cryptographic standards and minimizes vulnerabilities related to outdated or insecure algorithms.
*/


import crypto from 'crypto';

// Generate a random 256-bit key (32 bytes) for AES-256-GCM
const key = crypto.randomBytes(32);

// Generate a random initialization vector (IV)
const iv = crypto.randomBytes(12); // 12 bytes for GCM mode

// Replace with your actual method to get the secret text
const secretText = obj.getSecretText(); 

// AES Encryption using AES-256-GCM (recommended for strong security)
const aesCipher = crypto.createCipheriv('aes-256-gcm', key, iv);
let aesEncrypted = aesCipher.update(secretText, 'utf8', 'hex');
aesEncrypted += aesCipher.final('hex');

// Get the authentication tag
const tag = aesCipher.getAuthTag().toString('hex');

// For security, you must store or transmit the IV, ciphertext, and tag together.
// Typically, you would combine these into a single string or object for storage/transmission.
const encryptedData = {
    iv: iv.toString('hex'),
    ciphertext: aesEncrypted,
    tag: tag
};

console.log('Encrypted Data:', JSON.stringify(encryptedData));

// Example function for decryption (make sure to use proper secure key management and transmission)
function decrypt(encryptedData: { iv: string; ciphertext: string; tag: string }, key: Buffer): string {
    const iv = Buffer.from(encryptedData.iv, 'hex');
    const tag = Buffer.from(encryptedData.tag, 'hex');
    const encryptedText = Buffer.from(encryptedData.ciphertext, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(tag);

    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

// Example decryption (for demonstration purposes)
const decryptedText = decrypt(encryptedData, key);
console.log('Decrypted Text:', decryptedText);

