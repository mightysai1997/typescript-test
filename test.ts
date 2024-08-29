import express, { Request, Response } from 'express';

const app = express();

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/remember-password', (req: Request, res: Response) => {
    // Retrieving sensitive data from query parameters
    const pw = req.query.current_password as string;

    // CWE-312: Cleartext Storage of Sensitive Information
    // Description: This code stores sensitive information (password) in a cookie
    // without encryption or protection. This makes it vulnerable to exposure 
    // if the cookie is intercepted or accessed by unauthorized parties.
    //
    // Issues:
    // - The cookie is set with cleartext sensitive data.
    // - No security attributes like `httpOnly` or `secure` are applied.
    //
    // Risks:
    // - Sensitive information (password) can be exposed if intercepted or accessed.
    // - The cookie can be read by client-side scripts if `httpOnly` is not set.
    // - Data in the cookie can be read over insecure connections if `secure` is not set.

    res.cookie("password", pw);

    res.send('Password cookie has been set');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
