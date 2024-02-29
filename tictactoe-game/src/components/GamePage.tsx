import logo from "../assets/logo.svg";
import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";
import resIcon from "../assets/icon-restart.svg";
import Square from "./Square";
import ScoreUi from "./ScoreUi";
import { useState } from "react";

export default function GamePage() {
  type Player = "X" | "O";
  type Board = Player | null;

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

  const [board, setBoard] = useState<Board[]>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);



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
        <button className="size-[2.5rem] tab:size-[3.25rem] grid place-items-center cursor-pointer rounded-[10px] shadow-res bg-silver-cl">
          <img
            src={resIcon}
            alt="restart"
            className="size-[16px] tab:size-[20px]"
          />
        </button>
      </div>
      <div className="mt-[4rem] tab:mt-[2rem] space-y-[1.25rem]">
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
          <Square index={0} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
          <Square index={1} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
          <Square index={2} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        </div>
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
        <Square index={3} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        <Square index={4} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        <Square index={5} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        </div>
        <div className="flex items-center justify-between gap-[3vw] tab:gap-[15px]">
        <Square index={6} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        <Square index={7} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        <Square index={8} board={board} setBoard={setBoard} curPlayer={currentPlayer} setCurPlayer={setCurrentPlayer} />
        </div>
      </div>
      <div className="flex items-center justify-between gap-[3vw] mt-[1.19rem] tab:gap-[15px]">
        <ScoreUi />
        <ScoreUi />
        <ScoreUi />
      </div>
    </div>
  );
}
