import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import Map from "./map";

const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
      <Map />
    </p>
  );
}

export default App;
