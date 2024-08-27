/*
Sample code for vulnerability type : Use of Password Hash With Insufficient Computational Effort
CWE : CWE-916
Description : The code you provided is potentially vulnerable to the "Use of Password Hash With Insufficient Computational Effort" security issue. This vulnerability occurs when passwords are hashed without the application of a computationally intensive hashing algorithm or without using a sufficient number of iterations. This makes it easier for attackers to use brute-force or dictionary attacks to guess the original password.
*/
import * as crypto from 'crypto';

function hashPassword(password: string) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.createHash('md5').update(password + salt).digest('hex');
  return { salt, hash };
}

function verifyPassword(password: string, hashedPassword: string, salt: string) {
  const hash = crypto.createHash('md5').update(password + salt).digest('hex'); //Source and Sink
  return hash === hashedPassword;
}

const userPassword = 'mySecretPassword';
const hashedData = hashPassword(userPassword);

console.log('Salt:', hashedData.salt);
console.log('Hashed Password:', hashedData.hash);

const isPasswordCorrect = verifyPassword(userPassword, hashedData.hash, hashedData.salt);
console.log('Is Password Correct?', isPasswordCorrect);
