import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";

type Action =
  | { type: "player1" }
  | { type: "player2" }
  | { type: "tie" }
  | { type: "reset" };

type Player = "X" | "O";
type Board = Player | null;

type winCardProps = {
  singlePlayer: boolean;
  player1: "X" | "O";
  winner: "X" | "O" | "Draw" | null;
  setPlayer1: React.Dispatch<React.SetStateAction<"X" | "O">>;
  setPlayer2: React.Dispatch<React.SetStateAction<"X" | "O">>;
  setBoard: React.Dispatch<React.SetStateAction<("X" | "O" | null)[]>>;
  dispatch: React.Dispatch<Action>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  setWinner: React.Dispatch<React.SetStateAction<"Draw" | Player | null>>;
};

export default function WinCard({
  singlePlayer,
  player1,
  winner,
  setPlayer1,
  setBoard,
  dispatch,
  setLevel,
  setHomePage,
  setModal,
  setWinner,
  setPlayer2,
}: winCardProps) {
  let message = "hello";
  let player = "player";

  if (singlePlayer) {
    if (player1 === winner) {
      message = "you won...";
    } else {
      message = "oh no, you lost...";
    }
  } else {
    if (player1 === winner) {
      player = "Player 1 wins!";
    } else {
      player = "Player 2 wins!";
    }
  }

  const initialBoard: Board[] = Array(9).fill(null);

  function handleQuit() {
    setPlayer1("O");
    setBoard(initialBoard);
    dispatch({ type: "reset" });
    setLevel("easy");
    setHomePage(true);
    setWinner(null);
    setModal(null);
  }

  function handleNextRound() {
    if (player1 === "X") {
      setPlayer2("X");
      setPlayer1("O");
    } else {
      setPlayer2("O");
      setPlayer1("X");
    }
    setBoard(initialBoard);
    setWinner(null);
    setModal(null);
  }

  return (
    <div className="size-full">
      <div className=" fixed z-0 transition-all duration-300 ease-in top-0 bg-win-bg size-full"></div>
      <div className="z-10 fixed h-[16.625rem] flex flex-col justify-center items-center uppercase bg-semi-dark-navy w-full top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2">
        <h2 className="text-silver-cl text-[0.8rem] exsm:text-[0.875rem] tab:text-[1.01rem] tracking-[0.875px] leading-[1.125rem] font-bold">
          {singlePlayer ? message : player}
        </h2>
        <div className="flex items-center h-[1.75rem] tab:h-[4rem] justify-center gap-4 exsm:gap-[1.5rem] mb-[1.5rem] mt-[1rem]">
          <img
            src={winner === "X" ? xIcon : oIcon}
            alt="winner"
            className=" size-[26px] exsm:size-[28px] tab:size-16"
          />
          <p
            className={` text-[1.4rem] exsm:text-[1.5rem] tab:text-[2.5rem] leading-[1.875rem] tab:leading-[3.125rem] ${
              winner === "X" ? "text-light-blue" : " text-light-yellow"
            } font-bold`}
          >
            takes the round
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleQuit}
            className="text-dark-navy cursor-pointer transition-all duration-300 hover:bg-silver-hover bg-silver-cl shadow-res font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]"
          >
            quit
          </button>
          <button
            onClick={handleNextRound}
            className="text-dark-navy cursor-pointer transition-all duration-300 hover:bg-light-yellow-hover bg-light-yellow shadow-nxt font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]"
          >
            next round
          </button>
        </div>
      </div>
    </div>
  );
}
