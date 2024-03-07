import logo from "../assets/logo.svg";
import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";
import resIcon from "../assets/icon-restart.svg";
import Square from "./Square";
import ScoreUi from "./ScoreUi";
import { useState, useEffect, useCallback } from "react";

type InitialState = {
  [index: string]: number;
};

type Action =
  | { type: "player1" }
  | { type: "player2" }
  | { type: "tie" }
  | { type: "reset" };

type GamePageProps = {
  player1: "X" | "O";
  player2: "X" | "O";
  singlePlayer: boolean;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  level: string;
  winner: "X" | "O" | "Draw" | null;
  setWinner: React.Dispatch<React.SetStateAction<"X" | "O" | "Draw" | null>>;
  board: ("X" | "O" | null)[];
  setBoard: React.Dispatch<React.SetStateAction<("X" | "O" | null)[]>>;
  state: InitialState;
  dispatch: React.Dispatch<Action>;
};

export default function GamePage({
  player1,
  player2,
  singlePlayer,
  setModal,
  level,
  winner,
  setWinner,
  board,
  setBoard,
  state,
  dispatch,
}: GamePageProps) {
  type Player = "X" | "O";
  type Board = Player | null;

  const player1Title = `${
    singlePlayer ? player1 + " (you)" : player1 + " (P1)"
  }`;
  const player2Title = `${
    singlePlayer ? player2 + " (cpu)" : player2 + " (P2)"
  }`;
  const tieTitle = "tie";

  const [currentPlayer, setCurrentPlayer] = useState<Player>("X");

  const [winArray, setWinArray] = useState<number[] | null>(null);

  const checkWinner = useCallback((board: Board[]): Player | "Draw" | null => {
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

    for (const combo of winningCombos) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinArray([a, b, c]);
        return board[a] as Player;
      }
    }
    if (!board.includes(null)) return "Draw";
    return null;
  }, []);

  const setScores = useCallback(
    (winner: Player | "Draw") => {
      if (winner) {
        if (player1 === winner) {
          dispatch({ type: "player1" });
          setTimeout(() => {
            setModal("game");
          }, 1000);
        } else if (player2 === winner) {
          dispatch({ type: "player2" });
          setTimeout(() => {
            setModal("game");
          }, 1000);
        } else {
          dispatch({ type: "tie" });
          setTimeout(() => {
            setModal("tie");
          }, 1000);
        }
      }
    },
    [player1, player2, setModal, dispatch]
  );

  const handleCellClick = useCallback(
    (index: number) => {
      if (!board[index] && !winner) {
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        const newWinner = checkWinner(newBoard);
        if (!newWinner) {
          setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        } else {
          setWinner(newWinner);
          setScores(newWinner);
        }
      }
    },
    [board, currentPlayer, setBoard, checkWinner, setWinner, winner, setScores]
  );

  const makeAIMove = useCallback(() => {
    // cpu functionality

    const cpuMove = (board: (Player | null)[]): number => {
      const cpuSymbol: Player = player2;
      const opponentSymbol: Player = player1;

      // Function to check if a player has won
      const hasPlayerWon = (player: Player): boolean => {
        const winningCombos: number[][] = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], // Rows
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8], // Columns
          [0, 4, 8],
          [2, 4, 6], // Diagonals
        ];

        return winningCombos.some(
          ([a, b, c]) =>
            board[a] === player && board[b] === player && board[c] === player
        );
      };

      // Check for winning move for CPU
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          // Simulate placing the CPU symbol at the empty space
          board[i] = cpuSymbol;
          // Check if this move leads to a win for CPU
          if (hasPlayerWon(cpuSymbol)) {
            board[i] = null; // Reset the move
            return i;
          }
          // Reset the move for further evaluation
          board[i] = null;
        }
      }

      // Check for blocking opponent's winning move
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          // Simulate placing the opponent's symbol at the empty space
          board[i] = opponentSymbol;
          // Check if this move blocks opponent's winning move
          if (hasPlayerWon(opponentSymbol)) {
            board[i] = null; // Reset the move
            return i;
          }
          // Reset the move for further evaluation
          board[i] = null;
        }
      }

      // If no winning or blocking move, choose a random empty space
      const emptySpaces: number[] = [];
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          emptySpaces.push(i);
        }
      }

      // If there are no empty spaces left, return -1 to indicate no move available
      if (emptySpaces.length === 0) {
        return -1;
      }

      // Choose a random index from the available empty spaces
      const randomIndex = Math.floor(Math.random() * emptySpaces.length);
      return emptySpaces[randomIndex];
    };

    if (level === "easy") {
      const availableMoves = board
        .map((cell, index) => (cell === null ? index : null))
        .filter((cell) => cell !== null) as number[];

      const randomIndex = Math.floor(Math.random() * availableMoves.length);
      handleCellClick(availableMoves[randomIndex]);
    } else {
      const newBoard = [...board];
      const moveIndex = cpuMove(newBoard);
      if (moveIndex !== -1) {
        handleCellClick(moveIndex);
      }
    }
  }, [board, handleCellClick, level, player1, player2]);

  useEffect(() => {
    if (singlePlayer && currentPlayer === player2 && !winner) {
      setTimeout(() => {
        makeAIMove();
      }, 500);
    }
  }, [currentPlayer, singlePlayer, player2, winner, makeAIMove]);

  function handleRestartButton() {
    setModal("restart");
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
        <button
          onClick={handleRestartButton}
          className="size-[2.5rem] tab:size-[3.25rem] grid place-items-center cursor-pointer rounded-[10px] shadow-res bg-silver-cl"
        >
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
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={0}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={1}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={2}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
        </div>
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={3}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={4}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={5}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
        </div>
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={6}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
            index={7}
            board={board}
            setBoard={setBoard}
            curPlayer={currentPlayer}
            setCurPlayer={setCurrentPlayer}
          />
          <Square
            setScores={setScores}
            winArray={winArray}
            winner={winner}
            setWinner={setWinner}
            checkWinner={checkWinner}
            player1={player1}
            singlePlayer={singlePlayer}
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
