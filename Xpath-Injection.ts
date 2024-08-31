import express from 'express';
import xpath from 'xpath';
import { DOMParser } from 'xmldom';
import fs from 'fs';

const app = express();
const port = 3000;

// Load and parse the XML file
const xml = fs.readFileSync('/var/tmp/export.xml', 'utf8');
const doc = new DOMParser().parseFromString(xml);

// Sanitize the input to prevent XPath Injection
function sanitizeInput(input: string): string {
    return input.replace(/'/g, "''").replace(/[\[\]]/g, ""); // Simple sanitization
}

app.get('/showteam', async (req, res) => {
    const teamName: string = req.query.team as string; // Source
    const sanitizedTeamName: string = sanitizeInput(teamName); // Sanitize user input

    try {
        // Build a safe XPath query
        const xpathQuery = `/teams/team[name='${sanitizedTeamName}']/members/member/name/text()`;
        const nodes = xpath.select(xpathQuery, doc); // Sink

        // Build the response HTML
        let responseHtml: string = "<ul>";
        nodes.forEach((n: any) => responseHtml += `<li>${n.toString()}</li>`);
        responseHtml += "</ul>";
        res.send(responseHtml);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
