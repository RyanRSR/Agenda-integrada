import "./App.css";
import ContCent from "./Components/ContCent";
import SideBar from "./Components/Side-Bar";

function App() {
  return (
    <div id="container">
      <SideBar fullname="Ryan Rocha" />
      <ContCent name="Ryan" />
    </div>
  );
}

export default App;
