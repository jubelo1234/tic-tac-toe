import { useEffect, useReducer, useState } from "react";
import "./App.css";
import GamePage from "./components/GamePage";
import Home from "./components/Home";
import RestartUi from "./components/RestartUi";
import WinCard from "./components/WinCard";
import TieCard from "./components/TieCard";
import { motion, Variants, AnimatePresence } from "framer-motion";

function App() {
  type Player = "X" | "O";
  type Board = Player | null;

  const initialBoard: Board[] = Array(9).fill(null);

  const [homePage, setHomePage] = useState<boolean>(true);
  const [singlePlayerMode, setSinglePlayerMode] = useState<boolean>(false);
  const [player1, setPlayer1] = useState<"X" | "O">("O");
  const [player2, setPlayer2] = useState<"X" | "O">("X");
  const [modal, setModal] = useState<string | null>(null);
  const [level, setLevel] = useState<string>("easy");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);
  const [board, setBoard] = useState<Board[]>(initialBoard);

  type InitialState = {
    [index: string]: number;
  };

  type Action =
    | { type: "player1" }
    | { type: "player2" }
    | { type: "tie" }
    | { type: "reset" };

  const initialState: InitialState = {
    player1Score: 0,
    player2Score: 0,
    tie: 0,
  };

  const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
      case "player1":
        return { ...state, player1Score: state.player1Score + 1 };
      case "player2":
        return { ...state, player2Score: state.player2Score + 1 };
      case "tie":
        return { ...state, tie: state.tie + 1 };
      case "reset":
        return {
          ...state,
          tie: (state.tie = 0),
          player1Score: (state.player1Score = 0),
          player2Score: (state.player2Score = 0),
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (player1 === "O") {
      setPlayer2("X");
    } else {
      setPlayer2("O");
    }
  }, [player1]);

  const homeVariants: Variants = {
    initial: {
      opacity: 0,
      y: "50%",
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 1.2,
      },
    },
    exit: {
      opacity: 0,
      y: -100,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  const gamePageVariants: Variants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="px-[6vw] pt-6 pb-10 flex items-center justify-center bg-dark-navy min-h-screen min-w-screen">
        <AnimatePresence mode="wait">
          {homePage ? (
            <motion.div
              key="hello"
              variants={homeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Home
                playerOne={setPlayer1}
                setPage={setHomePage}
                singlePlayer={setSinglePlayerMode}
                level={level}
                setLevel={setLevel}
                player1={player1}
              />
            </motion.div>
          ) : (
            <motion.div
              key="game"
              variants={gamePageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <GamePage
                state={state}
                dispatch={dispatch}
                board={board}
                setBoard={setBoard}
                winner={winner}
                setWinner={setWinner}
                player1={player1}
                player2={player2}
                singlePlayer={singlePlayerMode}
                setModal={setModal}
                level={level}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {modal && (
          <motion.div className="w-full absolute top-0 h-full">
            {modal === "restart" ? (
              <RestartUi
                setModal={setModal}
                setBoard={setBoard}
                dispatch={dispatch}
              />
            ) : modal === "tie" ? (
              <TieCard
                player1={player1}
                setBoard={setBoard}
                dispatch={dispatch}
                setPlayer1={setPlayer1}
                setLevel={setLevel}
                setHomePage={setHomePage}
                setModal={setModal}
                setWinner={setWinner}
                setPlayer2={setPlayer2}
              />
            ) : modal !== "restart" && modal !== "tie" ? (
              <WinCard
                setPlayer2={setPlayer2}
                singlePlayer={singlePlayerMode}
                player1={player1}
                winner={winner}
                setBoard={setBoard}
                dispatch={dispatch}
                setPlayer1={setPlayer1}
                setLevel={setLevel}
                setHomePage={setHomePage}
                setModal={setModal}
                setWinner={setWinner}
              />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
