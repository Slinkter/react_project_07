import "./App.css";
import Mensaje from "./components/mensaje";

function App() {
  return (
    <div className="App">
      <Mensaje props_firstName="liam " props_lastName="cave" props_age="26" />
      <Mensaje props_firstName="liam " props_lastName="cave" props_age="26" />
      <Mensaje props_firstName="liam " props_lastName="cave" props_age="26" />
      <Mensaje props_firstName="liam " props_lastName="cave" props_age="26" />
      <Mensaje props_firstName="liam " props_lastName="cave" props_age="26" />
    </div>
  );
}

export default App;
