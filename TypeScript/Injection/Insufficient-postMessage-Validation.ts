/*
Sample code for vulnerability type: Insufficient postMessage Validation
CWE: CWE-20
Discription: The origin of the received message is not verified, allowing any site, even potentially malicious ones, to send messages to this window. If this behavior is unexpected, it is advisable to implement checks to validate the sender's origin.
*/


import { expect } from 'chai';

// Assume eventSource is properly initialized for testing purposes
// You should have a proper setup for eventSource before running this test.

describe('Your Test Suite Name', () => {
  it('receives events from server', (done: Mocha.Done) => {
    eventSource.addEventListener('message', (event: MessageEvent) => {  //Source and Sink
      expect(JSON.parse(event.data)).to.eql({
        hello: 'world',
      });
      done();
    });
  });
});
