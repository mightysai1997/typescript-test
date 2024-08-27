/*
Sample code for Vulnerability type : Use dangerouslySetInnerHTML to be explicit that this function is dangerous and also trigger react updates
CWE : CWE-79
Discription : The provided code uses React's dangerouslySetInnerHTML instead of innerHTML or avoids setting innerHTML altogether.
*/


import React from "react";
import Highlight from "react-highlight";

const MyComponent: React.FC = () => (
    <>
        <Highlight />
        <Highlight className="javascript" />
        <Highlight className="typescript">console.log("Hello, world!");</Highlight>
        <Highlight innerHTML /> //Source and Sink
        <Highlight innerHTML={true} />  //Source and Sink
        <Highlight innerHTML={false} /> //Source and Sink
    </>
);

export default MyComponent;
