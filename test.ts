import * as fs from 'fs';

// Source: Retrieve sensitive data (e.g., user password)
function getUserPassword(): string {
    // Example of sensitive data
    return 'userPassword123'; // Sensitive information
}

// Sink: Storing sensitive data in plaintext
function storePassword(password: string): void {
    // Write sensitive data to a file without encryption
    fs.writeFileSync('user_password.txt', password, 'utf8');
}

// Example usage
const password = getUserPassword();
storePassword(password);
