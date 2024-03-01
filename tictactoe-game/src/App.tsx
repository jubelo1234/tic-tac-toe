import { useEffect, useState } from "react";
import "./App.css";
import GamePage from "./components/GamePage";
import Home from "./components/Home";
import RestartUi from "./components/RestartUi";
import WinCard from "./components/WinCard";
import TieCard from "./components/TieCard";

function App() {
  const [homePage, setHomePage] = useState<boolean>(true);
  const [singlePlayerMode, setSinglePlayerMode] = useState<boolean>(false);
  const [player1, setPlayer1] = useState<string>("O");
  const [player2, setPlayer2] = useState<string>("X");
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {

    if (player1 === "O"){
      setPlayer2("X")
    } else {
      setPlayer2("O")
    }

  }, [player1])

  return (
    <>
      <div className="px-[6vw] py-10 flex items-center justify-center bg-dark-navy min-h-screen min-w-screen">
        {homePage ? (
          <Home
            playerOne={setPlayer1}
            setPage={setHomePage}
            singlePlayer={setSinglePlayerMode}
          />
        ) : (
          <GamePage player1={player1} player2={player2} setPlayer1={setPlayer1} setPlayer2={setPlayer2} singlePlayer={singlePlayerMode} setModal={setModal}/>
        )}
      </div>
      {modal && (
        <div className="w-full absolute top-0 h-full">
          {modal === "restart" && <RestartUi setModal={setModal}/>}
          {modal === "tie" && <TieCard />}
          {modal !== "restart" && modal !== "tie" && <WinCard />}
        </div>
      )}
    </>
  );
}

export default App;
