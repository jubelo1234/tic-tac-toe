import oIcon from "../assets/icon-o.svg";
import xIcon from "../assets/icon-x.svg";
import oLine from "../assets/icon-o-outline.svg";
import xLine from "../assets/icon-x-outline.svg";
import xdark from "../assets/icon-x-dark.svg";
import odark from "../assets/icon-o-dark.svg";
import { motion } from "framer-motion";

type Player = "X" | "O";
type Board = Player | null;

type squareProps = {
  index: number;
  board: Board[];
  setBoard: React.Dispatch<React.SetStateAction<Board[]>>;
  curPlayer: "X" | "O";
  setCurPlayer: React.Dispatch<React.SetStateAction<Player>>;
  player1: string;
  singlePlayer: boolean;
  winner: Player | "Draw" | null;
  setWinner: React.Dispatch<React.SetStateAction<Player | "Draw" | null>>;
  checkWinner: (board: Board[]) => Player | "Draw" | null;
  winArray: number[] | null;
  setScores: (winner: Player | "Draw") => void;
};

export default function Square({
  index,
  board,
  setBoard,
  curPlayer,
  setCurPlayer,
  player1,
  singlePlayer,
  winner,
  setWinner,
  checkWinner,
  winArray,
  setScores,
}: squareProps) {
  function handleClick(index: number) {
    if (singlePlayer) {
      if (player1 === curPlayer && !board[index] && !winner) {
        const newBoard = [...board];
        newBoard[index] = curPlayer;
        setBoard(newBoard);
        const newWinner = checkWinner(newBoard);
        if (!newWinner) {
          setCurPlayer(curPlayer === "X" ? "O" : "X");
        } else {
          setWinner(newWinner);
          setScores(newWinner);
          setCurPlayer("X");
        }
      } else {
        return;
      }
    } else {
      if (!board[index] && !winner) {
        const newBoard = [...board];
        newBoard[index] = curPlayer;
        setBoard(newBoard);
        const newWinner = checkWinner(newBoard);
        if (!newWinner) {
          setCurPlayer(curPlayer === "X" ? "O" : "X");
        } else {
          setWinner(newWinner);
          setScores(newWinner);
          setCurPlayer("X");
        }
      }
    }
  }

  const imgVariants = {
    initial: {
      opacity: 0,
      scale: 0,
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scale: 1,
      transition: {
        ease: "easeOut",
        duration: 0.3,
      },
    },
  };

  return (
    <div
      onClick={() => handleClick(index)}
      className={` group transition-all duration-300 ease-in  grid place-items-center rounded-[15px] ${
        winner && winArray?.includes(index) && winner !== "Draw"
          ? board[index] === "X"
            ? "bg-light-blue"
            : "bg-light-yellow"
          : "bg-semi-dark-navy"
      } pb-2 shadow-pick cursor-pointer size-[26.5vw] tab:size-[140px]`}
    >
      {winner && winArray?.includes(index) && winner !== "Draw" ? (
        <motion.img
          key="hello"
          variants={imgVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          src={board[index] === "X" ? xdark : odark}
          alt="x or o image"
          className=" size-[3.1rem] exsm:size-[3.75rem] min-[400px]:size-[4rem] "
        />
      ) : board[index] ? (
        <motion.img
          key="git"
          variants={imgVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          src={board[index] === "X" ? xIcon : oIcon}
          alt="x or o image"
          className=" size-[3.1rem] exsm:size-[3.75rem] min-[400px]:size-[4rem] "
        />
      ) : (
        <img
          src={curPlayer === "X" ? xLine : oLine}
          alt="x or o image"
          className=" hidden transition-all duration-300 ease-in lg:group-hover:block size-[3.1rem] exsm:size-[3.75rem] min-[400px]:size-[4rem] "
        />
      )}
    </div>
  );
}
