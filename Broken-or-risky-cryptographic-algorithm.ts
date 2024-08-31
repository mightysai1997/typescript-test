import crypto from 'crypto';

// Generate a random 256-bit key (32 bytes) for AES-256-GCM
const key = crypto.randomBytes(32);

// Generate a random initialization vector (IV)
const iv = crypto.randomBytes(12); // 12 bytes for GCM mode

const secretText = obj.getSecretText(); // Replace with your actual method to get the secret text

// AES Encryption using AES-256-GCM (recommended for strong security)
const aesCipher = crypto.createCipheriv('aes-256-gcm', key, iv);
let aesEncrypted = aesCipher.update(secretText, 'utf8', 'hex');
aesEncrypted += aesCipher.final('hex');

// Get the authentication tag
const tag = aesCipher.getAuthTag().toString('hex');

console.log('AES Encrypted:', aesEncrypted);
console.log('IV:', iv.toString('hex')); // Store or transmit the IV securely
console.log('Tag:', tag); // Store or transmit the authentication tag securely
