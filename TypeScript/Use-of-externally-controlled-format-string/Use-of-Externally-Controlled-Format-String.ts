/*
Type Of Vulnerability : Use of Externally-Controlled Format String 
CWE : CWE-134
Discription : The provided code contains unsanitized user input from an HTTP parameter that directly flows into a log statement, serving as a format string. This situation may enable a user to inject unforeseen content into the application log, posing a potential security risk
*/
import express, { Request, Response } from 'express';

const app = express();

app.get('/unauthorized', (req: Request, res: Response) => {
    let user = req.query.user; //Source
    let ip = req.connection.remoteAddress;
    console.log("Unauthorized access attempt by " + user, ip); //Sink
});

const PORT: number = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
