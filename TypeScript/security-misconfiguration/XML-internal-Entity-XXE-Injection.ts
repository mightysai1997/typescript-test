/*
Sample code for vulnerability type : XML- internal-Entity-XXE-Injection
CWE : CWE-776
Description : The below-provided code contains unsanitized user input from the HTTP request body, which flows into a write operation with enabled external entities. This vulnerability can potentially lead to denial-of-service (DoS) attacks through uncontrolled internal entity expansion.
*/

import * as express from "express";
import * as expat from "node-expat";

const app = express();
app.use(express.json());

app.post("upload", (req, res) => {
  let xmlSrc = req.body, //Source
    parser = new expat.Parser();
  parser.on("startElement", handleStart);
  parser.on("text", handleText);
  parser.write(xmlSrc); //Sink
});
