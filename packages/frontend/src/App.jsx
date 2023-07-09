import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("http://localhost:8080")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Hello World App</h1>
      <button onClick={fetchData}>Load Data</button>
      <pre>{data && JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
