/*
Sample code for Vulnerable type : Command Injection
CWE : CWE-78
Description : The provided code is vulnerable to command injection. In the given code snippet, the cmd variable is directly obtained from the req.query object without proper validation or sanitization. It is then passed directly to the execSync function, which executes the command specified in cmd in the underlying operating system. This can allow an attacker to inject arbitrary commands, leading to potential security risks and unauthorized access to the system
*/

import { execSync } from 'child_process';
import { Request } from 'express'; // Make sure to import the appropriate type for `req`

const cmd = req.query.cmd; //Source
execSync(cmd); //Sink
