/*
Type Of Vulnerability : SQL Injection
CWE: CWE-89
Description : The below provided code is vulnerable to SQL Injection due to the way it constructs the SQL query string. In the SQL query, values from the req.query object are directly interpolated into the query string without proper validation or sanitization. This means that an attacker can manipulate the req.query.user and req.query.pass values to inject malicious SQL code, leading to unauthorized access or data manipulation in the database.
*/

import { Request, Response } from 'express'; // Make sure to import the appropriate types for `req` and `res`

async function index(req: Request, res: Response) {
    const { db, User } = req.app.get('sequelize');

    try {
        let loggedInUser = await db.query( //Sink
            `SELECT * FROM users WHERE user = '${req.query.user}' AND pass = '${req.query.pass}'`, //Source
            {
                model: User,
            }
        ); // Noncompliant

        res.send(JSON.stringify(loggedInUser));
    } catch (error) {
        console.error('An error occurred:', error);
        res.status(500).send('Internal Server Error');
    }

    res.end();
}
