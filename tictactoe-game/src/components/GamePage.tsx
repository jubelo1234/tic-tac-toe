import logo from "../assets/logo.svg";
import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";
import resIcon from "../assets/icon-restart.svg";
import Square from "./Square";
import ScoreUi from "./ScoreUi";
import { useReducer, useState, useEffect } from "react";

type GamePageProps = {
  player1: string;
  player2: string;
  setPlayer1: React.Dispatch<React.SetStateAction<string>>;
  setPlayer2: React.Dispatch<React.SetStateAction<string>>;
  singlePlayer: boolean;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function GamePage({
  player1,
  player2,
  setPlayer1,
  setPlayer2,
  singlePlayer,
  setModal,
}: GamePageProps) {
  type Player = "X" | "O";
  type Board = Player | null;

  type InitialState = {
    [index: string]: number;
  };

  type Action = { type: "player1" } | { type: "player2" } | { type: "tie" };

  const winningCombos: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const initialBoard: Board[] = Array(9).fill(null);

  const player1Title = `${
    singlePlayer ? player1 + " (you)" : player1 + " (P1)"
  }`;
  const player2Title = `${
    singlePlayer ? player2 + " (cpu)" : player2 + " (P2)"
  }`;
  const tieTitle = "tie";

  const [board, setBoard] = useState<Board[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");
  const [winner, setWinner] = useState<Player | "Draw" | null>(null);

  const initialState: initialState = {
    player1Score: 0,
    player2Score: 0,
    tie: 0,
  };

  useEffect(() => {
    if (singlePlayer && currentPlayer === player2) {
      setTimeout(() => makeAIMove(), 500);
    }
    function makeAIMove() {
      const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((cell) => cell !== null) as number[];
  
      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      handleCellClick(availableMoves[randomIndex]);
    }
    const handleCellClick = (index: number) => {
      if (!board[index]) {
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        // const newWinner = checkWinner(newBoard);
        // if (!newWinner) {
        //   setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
        // } else {
        //   setWinner(newWinner);
        // }
      }
    };
  }, [currentPlayer, singlePlayer, player2, board]);



  const reducer = (state: InitialState, action: Action): InitialState => {
    switch (action.type) {
      case "player1":
        return { ...state, player1Score: (state.player1Score += 1) };
      case "player2":
        return { ...state, player2Score: (state.player2Score += 1) };
      case "tie":
        return { ...state, tie: (state.tie += 1) };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function handleRestartButton(){
    setModal("restart")
  }

  return (
    <div className="w-full max-w-[550px] tab:max-w-[460px] mx-auto">
      <div className="flex justify-between items-center">
        <div className="w-fit flex items-center justify-center">
          <img src={logo} alt="logo" className="h-[2rem]" />
        </div>
        <div className="flex justify-center items-center pb-[4px] gap-[0.8125rem] rounded-[0.625rem] h-[2.5rem] tab:h-[3.25rem] w-[6rem] tab:w-[8.75rem] bg-semi-dark-navy shadow-turn">
          <img
            src={currentPlayer === "X" ? xIcon : oIcon}
            alt="turns"
            className=" size-[16px] tab:size-[20px]"
          />
          <p className=" leading-none font-medium text-[0.875rem] uppercase text-silver-cl">
            Turn
          </p>
        </div>
        <button onClick={handleRestartButton} className="size-[2.5rem] tab:size-[3.25rem] grid place-items-center cursor-pointer rounded-[10px] shadow-res bg-silver-cl">
          <img
            src={resIcon}
            alt="restart"
            className="size-[16px] tab:size-[20px]"
          />
        </button>
      </div>
      <div className="mt-[4rem] tab:mt-[2rem] space-y-[1.25rem]">
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
          <Square
            index={0}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            index={1}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            index={2}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
        </div>
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
          <Square
            index={3}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            index={4}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            index={5}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
        </div>
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
          <Square
            index={6}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            index={7}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            index={8}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-[3vw] mt-[1.19rem] tab:gap-[15px]">
        <ScoreUi
          player={player1}
          title={player1Title}
          score={state.player1Score}
        />
        <ScoreUi player="tie" title={tieTitle} score={state.tie} />
        <ScoreUi
          player={player2}
          title={player2Title}
          score={state.player2Score}
        />
      </div>
    </div>
  );
}
