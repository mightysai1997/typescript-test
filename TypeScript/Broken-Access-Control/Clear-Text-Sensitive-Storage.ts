import express from 'express';

const app = express();
const PORT = 3000;

app.get('/remember-password', (req, res) => {
    let pw: string | undefined = req.query.current_password as string;
    // BAD: Setting a cookie value with cleartext sensitive data.
    if (pw) {
        res.cookie("password", pw);
        res.send("Password saved successfully!");
    } else {
        res.status(400).send("Invalid password");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

