import logo from "../assets/logo.svg";
import xSilver from "../assets/icon-x-silver.svg";
import xBlack from "../assets/icon-x-dark.svg";
import oSilver from "../assets/icon-o-silver.svg";
import oBlack from "../assets/icon-o-dark.svg";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

type homeProps = {
  playerOne: React.Dispatch<React.SetStateAction<"X" | "O">>;
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
  singlePlayer: React.Dispatch<React.SetStateAction<boolean>>;
  level: string;
  setLevel: React.Dispatch<React.SetStateAction<string>>;
  player1: "X" | "O";
};

export default function Home({
  playerOne,
  setPage,
  singlePlayer,
  level,
  setLevel,
  player1,
}: homeProps) {
  function handleSinglePlayer(): void {
    setPage(false);
    singlePlayer(true);
  }

  function handleMultiPlayer(): void {
    setPage(false);
    singlePlayer(false);
  }

  function handleLevel(e: React.MouseEvent<HTMLButtonElement>): void {
    setLevel(e.currentTarget.value);
  }

  const [xImg, setXImg] = useState(xSilver);
  const [oImg, setOImg] = useState(oBlack);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (player1 === "O") {
        setXImg(xSilver);
        setOImg(oBlack);
      } else {
        setXImg(xBlack);
        setOImg(oSilver);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [player1]);

  return (
    <motion.div className="w-full max-w-[550px] tab:max-w-[460px] mx-auto">
      <div className="w-full flex items-center justify-center">
        <img src={logo} alt="logo" className="h-[2rem]" />
      </div>
      <div className="mt-[2rem] uppercase flex items-center flex-col justify-center bg-semi-dark-navy w-full shadow-pick pt-6 pb-7 px-[17px] exsm:px-6 rounded-[0.9375rem]">
        <h2 className=" text-[0.9rem] exsm:text-[1rem] font-bold tracking-[1px] text-silver-cl">
          Pick player 1's mark
        </h2>
        <div className="h-[4.5rem] relative mt-[0.5rem] w-full flex items-center rounded-[16px] bg-dark-navy justify-center">
          <button
            onClick={() => playerOne("X")}
            className=" cursor-pointer relative z-10 w-1/2 flex items-center justify-center"
          >
            <img src={xImg} alt="option x" className=" size-[32px]" />
          </button>
          <button
            onClick={() => playerOne("O")}
            className="w-1/2 cursor-pointer relative z-10 flex items-center justify-center"
          >
            <img src={oImg} alt="option o" className=" size-[32px]" />
          </button>
          <div
            className={`bg-silver-cl transition-transform duration-500 ease-in-out z-0 top-1/2 transform -translate-y-1/2 ${
              player1 === "O" ? "translate-x-[50%]" : "-translate-x-[50%]"
            } absolute rounded-[8px] `}
            style={{ width: "calc(50% - 0.5rem", height: "calc(100% - 1rem)" }}
          ></div>
        </div>
        <h2 className=" text-[0.9rem] mt-[1rem] exsm:text-[1rem] font-bold tracking-[1px] text-silver-cl">
          Difficulty Selection
        </h2>
        <div className="h-[4.5rem] relative  mt-[0.5rem] w-full flex items-center rounded-[16px] bg-dark-navy justify-center">
          <button
            onClick={handleLevel}
            value={"easy"}
            className={` cursor-pointer font-extrabold text-[42px] transition-colors duration-500 ease-in-out relative z-10 w-1/2 flex ${
              level === "hard" ? " text-silver-cl" : " text-dark-navy"
            } items-center justify-center`}
          >
            1
          </button>
          <button
            onClick={handleLevel}
            value={"hard"}
            className={`w-1/2 cursor-pointer font-extrabold text-[42px] transition-colors duration-500 ease-in-out ${
              level === "easy" ? " text-silver-cl" : " text-dark-navy"
            } relative z-10 flex items-center justify-center`}
          >
            2
          </button>
          <div
            className={`bg-silver-cl transition-transform duration-500 ease-in-out z-0 top-1/2 transform -translate-y-1/2 ${
              level === "hard" ? "translate-x-[50%]" : "-translate-x-[50%]"
            } absolute rounded-[8px] `}
            style={{ width: "calc(50% - 0.5rem", height: "calc(100% - 1rem)" }}
          ></div>
        </div>
        <h4 className="mt-[1.0625rem] font-medium opacity-50 text-silver-cl text-[0.8rem] exsm:text-[0.875rem] tracking-[0.875px]">
          remember: x goes first
        </h4>
      </div>
      <div className="w-full space-y-[1rem] tab:space-y-[1.25rem] mt-[2rem] tab:mt-[2.5rem] ">
        <button
          onClick={handleSinglePlayer}
          className="w-full shadow-vcp uppercase h-[3.5rem] tab:h-[4.1875rem] text-center px-1 bg-light-yellow transition-all duration-300 hover:bg-light-yellow-hover text-[0.9rem] exsm:text-[1rem] tab:text-[20px] font-bold text-dark-navy tracking-[1.25px] rounded-[0.9375rem] cursor-pointer"
        >
          {" "}
          new game (vs AI)
        </button>
        <button
          onClick={handleMultiPlayer}
          className="w-full shadow-vpl uppercase h-[3.5rem] tab:h-[4.1875rem] text-center px-1 bg-silver-cl transition-all duration-300 hover:bg-silver-hover text-[0.9rem] exsm:text-[1rem] tab:text-[20px] font-bold text-dark-navy tracking-[1.25px] rounded-[0.9375rem] cursor-pointer"
        >
          {" "}
          new game (vs player)
        </button>
      </div>
    </motion.div>
  );
}
