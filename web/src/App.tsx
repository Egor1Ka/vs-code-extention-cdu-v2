import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [fileContent, setFileContent] = useState("");
  const [count, setCount] = useState(0);
  useEffect(() => {
    const messageHandler = (event: any) => {
      const message = event.data;
      if (message.command === "updateActiveFile") {
        setFileContent(message.activeFile);
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  return (
    <div>
      content
      <pre>{fileContent}</pre>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

export default App;
