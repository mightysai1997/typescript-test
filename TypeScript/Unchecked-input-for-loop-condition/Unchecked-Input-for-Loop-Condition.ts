/*
Sample code for vulnerable : Unchecked Input for Loop Condition
CWE : CWE-400/606
Discription : The 0 object may not be an array, and its length property may be directly set to huge values by an attacker, which would make this loop iterate too many times. This may lead to a Denial-of-service vulnerability.
*/


import express from 'express';
const app = express();

app.post("/foo", (req, res) => {
    const obj = req.body;

    const ret = [];

    // Potential DoS if obj.length is large.
    for (let i = 0; i < obj.length; i++) {  //source and sink
        ret.push(obj[i]);
    }
});
