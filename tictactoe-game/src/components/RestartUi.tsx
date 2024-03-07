
type Action =
| { type: "player1" }
| { type: "player2" }
| { type: "tie" }
| { type: "reset" };

type Player = "X" | "O";
type Board = Player | null;

type restartUiTypes = {
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  setBoard: React.Dispatch<React.SetStateAction<("X" | "O" | null)[]>>;
  dispatch: React.Dispatch<Action>;
}


export default function RestartUi({setModal, setBoard, dispatch}: restartUiTypes) {
  function handleCancel(){
    setModal(null);
  }

  const initialBoard: Board[] = Array(9).fill(null);

  function handleRestart() {
    setBoard(initialBoard);
    dispatch({ type: "reset" });
    setModal(null);
  }

  return (
    <div className="size-full">
      <div onClick={handleCancel} className=" fixed transition-all duration-300 ease-in z-0 top-0 bg-win-bg size-full"></div>
      <div  className="z-10 fixed h-[16.625rem] flex flex-col justify-center items-center uppercase bg-semi-dark-navy w-full top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2">
        <p className=" text-[1.4rem] exsm:text-[1.5rem] tab:text-[2.5rem] mb-5 tab:mb-[1.9375rem] leading-[1.875rem] tab:leading-[3.125rem] text-silver-cl font-bold">
          Restart game?
        </p>
        <div className="flex flex-col spec:flex-row gap-4">
          <button onClick={handleCancel} className="text-dark-navy w-[85vw] max-w-[272px] spec:max-w-[500px] spec:w-[158.20px] text-center cursor-pointer transition-all duration-300 hover:bg-silver-hover bg-silver-cl shadow-res font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]">
            no, cancel
          </button>
          <button onClick={handleRestart} className="text-dark-navy w-[85vw] max-w-[272px] spec:max-w-[500px] spec:w-[158.20px] text-center cursor-pointer transition-all duration-300 hover:bg-light-yellow-hover bg-light-yellow shadow-nxt font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]">
           yes, restart
          </button>
        </div>
      </div>
    </div>
  );
}
