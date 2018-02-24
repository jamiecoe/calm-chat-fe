import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
const uuidv4 = require('uuid/v4');

const uniqueId = uuidv4();

ReactDOM.render(<App uniqueId={uniqueId}/>, document.getElementById("root"));

