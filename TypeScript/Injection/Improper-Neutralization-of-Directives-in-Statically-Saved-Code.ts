/*
Sample code for vulnerable type: Improper Neutralization of Directives in Statically Saved Code
CWE : CWE-96
Description : Unsanitized input from an HTTP parameter flows into pug.compile, where it is used to construct a template that gets rendered. This may result in a Server-Side Template Injection vulnerability.
*/

import * as express from 'express';
import * as pug from 'pug';

const app = express();

app.post('/', (req: express.Request, res: express.Response) => {
    const input: string = req.query.username as string; //Source
    const template: string = `
doctype
html
head
    title= 'Hello world'
body
    form(action='/' method='post')
        input#name.form-control(type='text')
        button.btn.btn-primary(type='submit') Submit
    p Hello ` + input;

    const fn = pug.compile(template); //Sink
    const html = fn();
    res.send(html);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

