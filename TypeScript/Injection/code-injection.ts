import * as libxml from 'libxmljs2';

function parseXML(xmlString: string): libxml.Document {
    try {
        // Configure libxmljs2 to disable external entities
        const xmlDoc: libxml.Document = libxml.parseXml(xmlString, { noent: true });
        // Process the XML document...
        return xmlDoc;
    } catch (error) {
        console.error('Error parsing XML:', error);
        throw new Error('Invalid XML format');
    }
}

// Example usage
const xmlString: string = '<data>...</data>'; // XML input from user
try {
    const parsedXML: libxml.Document = parseXML(xmlString);
    // Process the parsed XML document...
    console.log('XML parsed successfully:', parsedXML.toString());
} catch (error) {
    console.error('Error:', error.message);
}
