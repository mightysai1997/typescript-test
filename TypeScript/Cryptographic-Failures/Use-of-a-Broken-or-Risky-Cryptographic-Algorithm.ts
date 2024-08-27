/*
Sample code for vulnerability type  : Use of a Broken or Risky Cryptographic Algorithm
CWE : CWE-327
Description : The provided code is using cryptographic algorithms that are considered broken or risky, which can lead to vulnerabilities. Specifically, the Data Encryption Standard (DES) encryption algorithm is known to be weak and should be avoided due to its vulnerability to brute-force attacks. Similarly, using a 128-bit Advanced Encryption Standard (AES) key in Cipher Block Chaining (CBC) mode can be risky, especially for certain use cases where a higher level of security is necessary. 
*/

import crypto from 'crypto';

const secretText = obj.getSecretText();
const key = 'your-secret-key'; // Replace with your actual encryption key

// DES Encryption (Avoid if possible due to weak encryption)
const desCipher = crypto.createCipher('des', key);
let desEncrypted = desCipher.update(secretText, 'utf8', 'hex');
desEncrypted += desCipher.final('hex');

// AES Encryption (Preferred for strong encryption)
const aesCipher = crypto.createCipher('aes-128-cbc', key);
let aesEncrypted = aesCipher.update(secretText, 'utf8', 'hex');
aesEncrypted += aesCipher.final('hex');

console.log('DES Encrypted:', desEncrypted);
console.log('AES Encrypted:', aesEncrypted);
