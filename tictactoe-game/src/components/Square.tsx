import oIcon from "../assets/icon-o.svg";
import xIcon from "../assets/icon-x.svg";
import oLine from "../assets/icon-o-outline.svg";
import xLine from "../assets/icon-x-outline.svg";

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
};

export default function Square({
  index,
  board,
  setBoard,
  curPlayer,
  setCurPlayer,
  player1,
  singlePlayer,
}: squareProps) {
  function handleClick(index: number) {
    if (singlePlayer){
      if (player1 === curPlayer && !board[index]){
          const newBoard = [...board];
          newBoard[index] = curPlayer;
          setBoard(newBoard);
          setCurPlayer(curPlayer === "X" ? "O" : "X");
      } else {
        return
      }
    } else {
      if (!board[index]){
        const newBoard = [...board];
        newBoard[index] = curPlayer;
        setBoard(newBoard);
        setCurPlayer(curPlayer === "X" ? "O" : "X");
    }
    }
  }

  return (
    <div
      onClick={() => handleClick(index)}
      className=" group bg-semi-dark-navy grid place-items-center rounded-[15px] pb-2 shadow-pick cursor-pointer size-[26.5vw] tab:size-[140px]"
    >
      {board[index] ? (
        <img
          src={board[index] === "X" ? xIcon : oIcon}
          alt="x or o image"
          className=" size-[3.1rem] exsm:size-[4rem] "
        />
      ) : (
        <img
          src={curPlayer === "X" ? xLine : oLine}
          alt="x or o image"
          className=" hidden group-hover:block size-[3.1rem] exsm:size-[4rem] "
        />
      )}
    </div>
  );
}
