import { useState } from "react";
import "./App.css";
import GamePage from "./components/GamePage";
import Home from "./components/Home";
import RestartUi from "./components/RestartUi";
import WinCard from "./components/WinCard";

function App() {

  const [homePage, setHomePage] = useState<boolean>(true);
  const [singlePlayerMode, setSinglePlayerMode] = useState<boolean>(false);
  const [player1, setPlayer1] = useState<string>("O");

  return (
    <div className="px-[6vw] py-10 flex items-center justify-center bg-dark-navy min-h-screen min-w-screen">
      {homePage ? <Home playerOne={setPlayer1} setPage={setHomePage} singlePlayer={setSinglePlayerMode}/> : <GamePage/>}
      {/* <div className="w-full absolute top-0 h-full">
       <RestartUi/>
      </div> */}
    </div>
  );
}

export default App;
