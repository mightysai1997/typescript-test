import * as fs from 'fs';

// Source: Sensitive data
function getSensitiveData(): string {
    // Example sensitive data (e.g., user password)
    return 'userPassword123';
}

// Sink: Storing sensitive data in plaintext
function storeSensitiveData(data: string): void {
    fs.writeFileSync('sensitive_data.txt', data);
}

// Example usage
const sensitiveData = getSensitiveData();
storeSensitiveData(sensitiveData);
