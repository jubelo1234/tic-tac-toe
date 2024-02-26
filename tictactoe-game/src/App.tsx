import "./App.css";
import GamePage from "./components/GamePage";
import Home from "./components/Home";
import RestartUi from "./components/RestartUi";
import WinCard from "./components/WinCard";

function App() {
  return (
    <div className="px-[6vw] py-10 flex items-center justify-center bg-dark-navy min-h-screen min-w-screen">
      <GamePage />
      <div className="w-full absolute top-0 h-full">
       <RestartUi/>
      </div>
    </div>
  );
}

export default App;
