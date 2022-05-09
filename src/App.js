import { useState } from "react";
import "./App.css";
import Mensaje from "./components/mensaje";

function App() {
  const [name, setName] = useState("");

  return (
    <div className="App">
      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Mensaje props_firstName={name} props_lastName="cave" props_age="26" />
    </div>
  );
}

export default App;
