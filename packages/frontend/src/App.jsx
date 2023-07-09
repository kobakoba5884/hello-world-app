import { useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch(import.meta.env.VITE_APP_API_URL)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div>
      <h1>Hello World App</h1>
      <button onClick={fetchData}>Load Data</button>
      <pre>{data && data?.hello}</pre>
    </div>
  );
}

export default App;
