/*
Sample code for vulnerable code : Use of Hardcoded Credentials 
CWE : CWE-798
Description : The provided code does exhibit the Use of Hardcoded Credentials vulnerability. This vulnerability occurs when sensitive credentials, such as passwords, are hardcoded directly into the source code. In this case, the passwords are hardcoded in the variables password. 
*/

class User {
  constructor(public username: string, public password: string) {}

  checkPassword(inputPassword: string): boolean {
    return this.password === inputPassword;
  }
}

const password: string = 'mysecretpass';

const fooPassword: string = 'mysecretpass';
