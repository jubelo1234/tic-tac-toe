import oIcon from "../assets/icon-o.svg";
import xIcon from "../assets/icon-x.svg";
import oLine from "../assets/icon-o-outline.svg";
import xLine from "../assets/icon-x-outline.svg";
import xdark from "../assets/icon-x-dark.svg";
import odark from "../assets/icon-o-dark.svg";

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
        }
      }
    }
  }

  return (
    <div
      onClick={() => handleClick(index)}
      className={` group  grid place-items-center rounded-[15px] ${
        winner && winArray?.includes(index)
          ? board[index] === "X"
            ? "bg-light-blue"
            : "bg-light-yellow"
          : "bg-semi-dark-navy"
      } pb-2 shadow-pick cursor-pointer size-[26.5vw] tab:size-[140px]`}
    >
      {winner && winArray?.includes(index) ? (
        <img
          src={board[index] === "X" ? xdark : odark}
          alt="x or o image"
          className=" size-[3.1rem] exsm:size-[4rem] "
        />
      ) : board[index] ? (
        <img
          src={board[index] === "X" ? xIcon : oIcon}
          alt="x or o image"
          className=" size-[3.1rem] exsm:size-[4rem] "
        />
      ) : (
        <img
          src={curPlayer === "X" ? xLine : oLine}
          alt="x or o image"
          className=" hidden lg:group-hover:block size-[3.1rem] exsm:size-[4rem] "
        />
      )}
    </div>
  );
}
