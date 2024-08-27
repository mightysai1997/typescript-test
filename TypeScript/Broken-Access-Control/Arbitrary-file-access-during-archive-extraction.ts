/*
Sample code for secure file extraction to prevent Zip Slip vulnerability
CWE: CWE-22
Description: This code includes validation to prevent arbitrary file writes via
archive extraction. It ensures that files are written only to the intended directory.
Fix: Validate the extracted file paths to ensure they do not escape the target directory
and do not contain invalid patterns.
*/

import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper'; // Assuming you are using the 'unzipper' package

const TARGET_DIR = path.join(__dirname, 'extracted_files'); // Set the intended extraction directory

fs.mkdirSync(TARGET_DIR, { recursive: true }); // Create target directory if it doesn't exist

fs.createReadStream('archive.zip')
  .pipe(unzipper.Parse()) // Source
  .on('entry', (entry: unzipper.Entry) => {
    const fileName = entry.path;

    // Validate the path to prevent Zip Slip
    const absolutePath = path.join(TARGET_DIR, fileName);
    const normalizedPath = path.normalize(absolutePath); // Normalize the path to resolve any '../' segments

    // Ensure the normalized path starts with the target directory
    if (!normalizedPath.startsWith(path.resolve(TARGET_DIR))) {
      console.error(`Invalid file path: ${fileName}`);
      entry.autodrain(); // Skip this entry
      return;
    }

    // Additional validation: disallow certain patterns (e.g., leading slashes)
    if (fileName.startsWith('/') || fileName.includes('\\')) {
      console.error(`Disallowed file path pattern: ${fileName}`);
      entry.autodrain(); // Skip this entry
      return;
    }

    // Proceed with writing the file to the target directory
    entry.pipe(fs.createWriteStream(normalizedPath)); // Sink
  });
