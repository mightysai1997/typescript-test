/*
Type Of Vulnerability : Improper Type Validation
CWE : CWE-1287
Discription : The provided code is susceptible to potential security risks due to the type of object coming from the body, and the ability for the user to control the value of its 'forEach' property. This vulnerability allows an attacker to manipulate the object's properties, potentially crashing the application or bypassing its intended logic. To mitigate this risk, it is essential to validate and restrict the type of objects accepted, ensuring that user input is properly sanitized and validated before processing.
*/

import { Request, Response, NextFunction } from 'express';
import { TraceParams, DataType, getDataType, getMimeType, getParsedBodyString } from './your-import-paths'; // Replace with appropriate import paths

async function yourMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        let traceParamsList: TraceParams[] = req.body;
        const dataType = getDataType(req.body);

        if (dataType !== DataType.ARRAY) {
            traceParamsList = [req.body];
        }

        traceParamsList.forEach((traceParams, idx) => {  // Sink
            const requestHeaders = traceParams.request?.headers ?? [];
            const responseHeaders = traceParams.response?.headers ?? [];
            let requestBodyContentType = null;
            let responseBodyContentType = null;

            requestHeaders.forEach(header => {
                if (header.name.toLowerCase() === 'content-type') {
                    requestBodyContentType = header.value;
                }
            });

            responseHeaders.forEach(header => {
                if (header.name.toLowerCase() === 'content-type') {
                    responseBodyContentType = header.value;
                }
            });

            if (requestBodyContentType) {
                const reqMimeType = getMimeType(requestBodyContentType);
                const parsedBodyString = getParsedBodyString(
                    traceParams?.request?.body,
                    reqMimeType?.subtype,
                    reqMimeType?.parameters,
                );

                if (dataType === DataType.ARRAY) {
                    req.body[idx].request.body = parsedBodyString;
                } else {
                    req.body.request.body = parsedBodyString;
                }
            } else {
                if (dataType === DataType.ARRAY) {
                    req.body[idx].request.body = traceParams?.request?.body;
                } else {
                    req.body.request.body = traceParams?.request?.body;
                }
            }

            if (responseBodyContentType) {
                const resMimeType = getMimeType(responseBodyContentType);
                const parsedBodyString = getParsedBodyString(
                    traceParams?.response?.body,
                    resMimeType?.subtype,
                    resMimeType?.parameters,
                );

                if (dataType === DataType.ARRAY) {
                    req.body[idx].response.body = parsedBodyString;
                } else {
                    req.body.response.body = parsedBodyString;
                }
            } else {
                if (dataType === DataType.ARRAY) {
                    req.body[idx].response.body = traceParams?.response?.body;
                } else {
                    req.body.response.body = traceParams?.response?.body;
                }
            }
        });

        next();
    } catch (err) {
        // Handle errors appropriately, for example:
        // await ApiResponseHandler.error(res, new Error500InternalServer(err));
        res.status(500).send('Internal Server Error');
    }
}

// Example usage in your Express application:
// app.use(yourMiddleware);
