import React from "react";
import socketIOClient from "socket.io-client";
import MapDaum from "./mapDaum";
import MapNaver from "./mapNaver";
import "./App.css";
import measure from "./utils/gps";

const ENDPOINT = "http://127.0.0.1:8888";
const { naver } = window;

function App() {
  //const [response, setResponse] = useState("");

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("FromAPI", (data) => {
  //     setResponse(data);
  //   });
  // }, []);
  const lat1 = "127.0324050 37.4909650 127.0315333 37.4912467";

  console.log(measure(127.032405, 37.490965, 127.0315333, 37.4912467));

  return (
    <div>
      {/* It's <time dateTime={response}>{response}</time> */}
      <MapDaum />
    </div>
  );
}

export default App;
