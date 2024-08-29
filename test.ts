class InsecureStorage {
    storeSensitiveData(username: string, password: string) {
        // NOT OK - Storing sensitive information in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        // NOT OK - Storing sensitive information in sessionStorage
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);

        // NOT OK - Writing sensitive information to a file (Node.js example)
        const fs = require('fs');
        fs.writeFileSync('credentials.txt', `Username: ${username}, Password: ${password}`);
    }
}

const storage = new InsecureStorage();
storage.storeSensitiveData('exampleUser', 'examplePassword');
