import oIcon from "../assets/icon-o.svg";
import xIcon from "../assets/icon-x.svg";
import oLine from "../assets/icon-o-outline.svg";
import xLine from "../assets/icon-x-outline.svg";

type squareProps = {
  index: number;
  board: (null | string)[];
  setBoard: React.Dispatch<React.SetStateAction<(null | string)[]>>;
  curPlayer: "X" | "O";
  setCurPlayer: React.Dispatch<React.SetStateAction<"X" | "O">>;
};

export default function Square({
  index,
  board,
  setBoard,
  curPlayer,
  setCurPlayer,
}: squareProps) {
  return (
    <div className=" group bg-semi-dark-navy grid place-items-center rounded-[15px] pb-2 shadow-pick cursor-pointer size-[26.5vw] tab:size-[140px]">
      {board[index] && (
        <img
          src={board[index] === "X" ? xIcon : oIcon}
          alt="x or o image"
          className=" size-[3.1rem] exsm:size-[4rem] "
        />
      )}
      {board[index] ?? (
        <img
          src={curPlayer === "X" ? xLine : oLine}
          alt="x or o image"
          className=" hidden group-hover:block size-[3.1rem] exsm:size-[4rem] "
        />
      )}
    </div>
  );
}
