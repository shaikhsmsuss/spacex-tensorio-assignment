import "./App.css";
import Header from "./commons/Header";
import SpacexLaunches from "./components/SpacexLaunches";
import { Routes, Route } from "react-router-dom";
import "./index.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/spacex" element={<SpacexLaunches />} />
      </Routes>
    </div>
  );
}

export default App;
