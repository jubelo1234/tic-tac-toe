import xIcon from "../assets/icon-x.svg";

export default function WinCard() {
  return (
    <div className="size-full">
      <div className=" fixed z-0 top-0 bg-win-bg size-full"></div>
      <div className="z-10 fixed h-[16.625rem] flex flex-col justify-center items-center uppercase bg-semi-dark-navy w-full top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2">
        <h2 className="text-silver-cl text-[0.8rem] exsm:text-[0.875rem] tab:text-[1.01rem] tracking-[0.875px] leading-[1.125rem] font-bold">
          player 2 wins!
        </h2>
        <div className="flex items-center h-[1.75rem] tab:h-[4rem] justify-center gap-4 exsm:gap-[1.5rem] mb-[1.5rem] mt-[1rem]">
          <img src={xIcon} alt="winner" className=" size-[26px] exsm:size-[28px] tab:size-16" />
          <p className=" text-[1.4rem] exsm:text-[1.5rem] tab:text-[2.5rem] leading-[1.875rem] tab:leading-[3.125rem] text-light-blue font-bold">
            takes the round
          </p>
        </div>
        <div className="flex gap-4">
          <button className="text-dark-navy cursor-pointer transition-all duration-300 hover:bg-silver-hover bg-silver-cl shadow-res font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]">
            quit
          </button>
          <button className="text-dark-navy cursor-pointer transition-all duration-300 hover:bg-light-yellow-hover bg-light-yellow shadow-nxt font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]">
            next round
          </button>
        </div>
      </div>
    </div>
  );
}
