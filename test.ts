// CWE-312: Cleartext Storage of Sensitive Information
// Description: This code stores sensitive information (username and password) in cleartext 
// using localStorage. This approach is insecure because localStorage is accessible by any
// script running on the page and can be exploited if an attacker gains access to the browser.

class User {
    username: string;
    password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

    saveCredentials() {
        // BAD: Storing sensitive information (username and password) in cleartext
        localStorage.setItem('username', this.username); // Sensitive data stored in localStorage
        localStorage.setItem('password', this.password); // Sensitive data stored in localStorage
    }
}

const user = new User('exampleUser', 'examplePassword');
user.saveCredentials();
