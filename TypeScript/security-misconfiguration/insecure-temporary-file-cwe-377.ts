import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Function that creates a temporary file
function createTempFile(data: string): string {
    // Create a temporary file in the system's temp directory
    const tempFilePath = path.join(os.tmpdir(), 'tempfile.txt');

    // Write data to the temporary file
    fs.writeFileSync(tempFilePath, data);

    // Return the path to the temporary file
    return tempFilePath;
}

// Example usage
const tempFile = createTempFile('Some sensitive data');
console.log(`Temporary file created at: ${tempFile}`);

