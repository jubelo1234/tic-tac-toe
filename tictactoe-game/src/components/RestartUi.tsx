import { motion } from "framer-motion";

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
};

export default function RestartUi({
  setModal,
  setBoard,
  dispatch,
}: restartUiTypes) {
  function handleCancel() {
    setModal(null);
  }

  const initialBoard: Board[] = Array(9).fill(null);

  function handleRestart() {
    setBoard(initialBoard);
    dispatch({ type: "reset" });
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
          className="z-10 absolute h-[16.625rem] flex flex-col justify-center items-center uppercase bg-semi-dark-navy w-full top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2"
        >
          <div className="overflow-hidden">
            <motion.p
              key="h2"
              variants={popUpvars}
              className=" text-[1.4rem] exsm:text-[1.5rem] tab:text-[2.5rem] mb-5 tab:mb-[1.9375rem] leading-[1.875rem] tab:leading-[3.125rem] text-silver-cl font-bold"
            >
              Restart game?
            </motion.p>
          </div>

          <div className="overflow-hidden">
            <motion.div
              key="btn"
              variants={popUpvars}
              className="flex flex-col spec:flex-row gap-4"
            >
              <button
                onClick={handleCancel}
                className="text-dark-navy w-[85vw] max-w-[272px] spec:max-w-[500px] spec:w-[158.20px] text-center cursor-pointer transition-all duration-300 hover:bg-silver-hover bg-silver-cl shadow-res font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]"
              >
                no, cancel
              </button>
              <button
                onClick={handleRestart}
                className="text-dark-navy w-[85vw] max-w-[272px] spec:max-w-[500px] spec:w-[158.20px] text-center cursor-pointer transition-all duration-300 hover:bg-light-yellow-hover bg-light-yellow shadow-nxt font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]"
              >
                yes, restart
              </button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}
