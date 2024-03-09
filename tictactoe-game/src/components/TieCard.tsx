import { motion } from "framer-motion";

type Action =
  | { type: "player1" }
  | { type: "player2" }
  | { type: "tie" }
  | { type: "reset" };

type Player = "X" | "O";
type Board = Player | null;

type TieCardProps = {
  player1: "X" | "O";
  setPlayer1: React.Dispatch<React.SetStateAction<"X" | "O">>;
  setPlayer2: React.Dispatch<React.SetStateAction<"X" | "O">>;
  setBoard: React.Dispatch<React.SetStateAction<("X" | "O" | null)[]>>;
  dispatch: React.Dispatch<Action>;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  setHomePage: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<string | null>>;
  setWinner: React.Dispatch<React.SetStateAction<"Draw" | Player | null>>;
};

export default function TieCard({
  player1,
  setPlayer1,
  setBoard,
  dispatch,
  setLevel,
  setHomePage,
  setModal,
  setWinner,
  setPlayer2,
}: TieCardProps) {
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

  const modalVariants = {
    initial: {
      opacity: 0,
      scaleY: 0,
    },
    animate: {
      opacity: 1,
      scaleY: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.5,
        delayChildren: 0.3,
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };

  const bgVars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };

  const popUpStag = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  const popUpvars = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
      },
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div
        key="bach"
        variants={bgVars}
        initial="initial"
        animate="animate"
        exit="exit"
        className=" fixed z-0 transition-all duration-300 ease-in top-0 bg-win-bg size-full"
      ></motion.div>

      <motion.div
        key="modal"
        variants={modalVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="size-full"
      >
        <motion.div
          variants={popUpStag}
          initial="initial"
          animate="animate"
          exit="initial"
          className="z-10 absolute  h-[16.625rem] flex flex-col justify-center items-center uppercase bg-semi-dark-navy w-full top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2"
        >
          <div className="overflow-hidden">
            <motion.p
              key="h2"
              variants={popUpvars}
              className=" text-[1.4rem] exsm:text-[1.5rem] tab:text-[2.5rem] mb-5 tab:mb-[1.9375rem] leading-[1.875rem] tab:leading-[3.125rem] text-silver-cl font-bold"
            >
              Round Tied!
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.div
              key="btn"
              variants={popUpvars}
              className="flex flex-col spec:flex-row gap-4"
            >
              <button
                onClick={handleQuit}
                className="text-dark-navy w-[85vw] max-w-[272px] spec:max-w-[500px] spec:w-[158.20px] text-center cursor-pointer transition-all duration-300 hover:bg-silver-hover bg-silver-cl shadow-res font-bold text-[0.95rem] exsm:text-[1rem] tab:text-[1.1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]"
              >
                Quit
              </button>
              <button
                onClick={handleNextRound}
                className="text-dark-navy w-[85vw] max-w-[272px] spec:max-w-[500px] spec:w-[158.20px] text-center cursor-pointer transition-all duration-300 hover:bg-light-yellow-hover bg-light-yellow shadow-nxt font-bold text-[0.95rem] exsm:text-[1rem] tab:text-[1.1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]"
              >
                next round
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
