/*
Sample code for vulnerability type : XML External Entity (XXE) Injection
CWE : CWE-611
Description : The below-provided code contains Unsanitized user input from the HTTP request body flows into libxmljs.parseXml, with external entities being enabled. This introduces the risk of XML External Entity Injection (XXE) attacks, which can lead to disclosure of confidential data, Denial of Service (DOS), Server-Side Request Forgery (SSRF) and other threats.
*/

import * as express from "express";
import * as libxml from "libxmljs";

const app = express();
libxml = require("libxmljs");

app.post("upload", (req, res) => {
  let xmlSrc: string = req.body;
  doc = libxml.parseXml(xmlSrc, { noent: true });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
