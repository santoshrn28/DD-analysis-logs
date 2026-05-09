import { useState } from "react";
import axios from "axios";

function App() {
  const [alerts, setAlerts] = useState("");
  const [result, setResult] = useState("");

  const analyzeAlerts = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/analyze",
      { alerts }
    );

    setResult(res.data.analysis);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Data Domain Alert Analyzer</h1>

      <textarea
        rows="15"
        cols="120"
        value={alerts}
        onChange={(e) => setAlerts(e.target.value)}
      />

      <br />

      <button onClick={analyzeAlerts}>
        Analyze
      </button>

      <pre>{result}</pre>
    </div>
  );
}

export default App;
