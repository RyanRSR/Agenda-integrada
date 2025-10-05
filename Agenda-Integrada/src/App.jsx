import "./App.css";
import ContCent from "./Components/ContCent";
import SideBar from "./Components/Side-Bar";

function App() {
  return (
    <div id="container">
      <SideBar />
      <ContCent name="Gabriel" />
    </div>
  );
}

export default App;
