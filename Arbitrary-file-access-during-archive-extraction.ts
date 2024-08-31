import * as fs from 'fs';
import * as path from 'path';
import * as unzipper from 'unzipper'; // Ensure 'unzipper' is installed

const TARGET_DIR = path.join(__dirname, 'extracted_files'); // Set the intended extraction directory

// Ensure the target directory exists
fs.mkdirSync(TARGET_DIR, { recursive: true }); 

fs.createReadStream('archive.zip')
  .pipe(unzipper.Parse()) // Source
  .on('entry', (entry: unzipper.Entry) => {
    const fileName = entry.path;

    // Construct and normalize the absolute path
    const absolutePath = path.join(TARGET_DIR, fileName);
    const normalizedPath = path.normalize(absolutePath);

    // Ensure the normalized path starts with the target directory
    if (!normalizedPath.startsWith(path.resolve(TARGET_DIR) + path.sep)) {
      console.error(`Invalid file path: ${fileName}`);
      entry.autodrain(); // Skip this entry
      return;
    }

    // Disallow leading slashes or backslashes in file paths
    if (fileName.startsWith('/') || fileName.includes('\\')) {
      console.error(`Disallowed file path pattern: ${fileName}`);
      entry.autodrain(); // Skip this entry
      return;
    }

    // Ensure directories are created before writing files
    const dirPath = path.dirname(normalizedPath);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    // Proceed with writing the file to the target directory
    entry.pipe(fs.createWriteStream(normalizedPath)) // Sink
      .on('error', (err) => {
        console.error(`Error writing file ${normalizedPath}: ${err.message}`);
      });
  })
  .on('error', (err) => {
    console.error(`Error processing archive: ${err.message}`);
  });
