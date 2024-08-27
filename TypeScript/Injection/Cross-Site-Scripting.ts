/*
Type Of Vulnerability : Cross-site Scripting (XSS)
CWE : CWE-79
Description: The below code provided has a Cross-site Scripting (XSS) vulnerability due to the way it handles user input. Specifically, the code constructs a SQL query string by directly inserting the values from req.query.user and req.query.pass into the query without proper validation, sanitization, or parameterization. This can allow an attacker to inject malicious JavaScript code into the query, leading to XSS attacks
*/


import { Request, Response } from 'express'; // Make sure to import the appropriate types for `req` and `res`

async function index(req: Request, res: Response) {
    const { db, User } = req.app.get('sequelize');

    try {
        let loggedInUser = await db.query(
            `SELECT * FROM users WHERE user = '${req.query.user}' AND pass = '${req.query.pass}'`,      //Source
            {
                model: User,
            }
        ); // Noncompliant

        res.send(JSON.stringify(loggedInUser));   //Sink
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Internal Server Error');
    }

    res.end();
}
