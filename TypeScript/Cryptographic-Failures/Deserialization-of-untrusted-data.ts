import * as fs from 'fs';

class User {
  constructor(public username: string) {}
}

function deserializeUser(data: string): User {
  return JSON.parse(data);
}

function main() {
  const maliciousData = '{"username": "attacker"}';

  // Simulate loading data from an untrusted source (e.g., a file)
  const userData = fs.readFileSync('user-data.json', 'utf-8');

  // Deserialize user data without proper validation
  const user = deserializeUser(userData);

  console.log('Logged in as: ' + user.username);
}

main();
