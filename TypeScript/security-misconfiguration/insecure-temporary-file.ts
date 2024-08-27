import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Function that creates a temporary file insecurely
function createInsecureTempFile(data: string): string {
    // CWE-377: Insecure Temporary File
    // Description: The file 'tempfile.txt' is created in the system's temporary directory
    // without specifying file permissions. This makes the file potentially accessible
    // by other processes or users, leading to potential unauthorized access or modification.
    const tempFilePath = path.join(os.tmpdir(), 'tempfile.txt');
    
    // Write data to the temporary file
    fs.writeFileSync(tempFilePath, data);

    // Return the path to the temporary file
    return tempFilePath;
}

// Example usage
const tempFile = createInsecureTempFile('Some sensitive data');
console.log(`Insecure temporary file created at: ${tempFile}`);

