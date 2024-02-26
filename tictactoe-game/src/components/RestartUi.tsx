export default function RestartUi() {
  return (
    <div className="size-full">
      <div className=" absolute z-0 top-0 bg-win-bg size-full"></div>
      <div className="z-10 absolute h-[16.625rem] flex flex-col justify-center items-center uppercase bg-semi-dark-navy w-full top-1/2 left-1/2  transform -translate-y-1/2 -translate-x-1/2">
        <p className=" text-[1.4rem] exsm:text-[1.5rem] tab:text-[2.5rem] mb-[1.9375] leading-[1.875rem] tab:leading-[3.125rem] text-light-blue font-bold">
          Restart game
        </p>
        <div className="flex gap-4">
          <button className="text-dark-navy cursor-pointer transition-all duration-300 hover:bg-silver-hover bg-silver-cl shadow-res font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]">
            no, cancel
          </button>
          <button className="text-dark-navy cursor-pointer transition-all duration-300 hover:bg-light-yellow-hover bg-light-yellow shadow-nxt font-bold text-[0.95rem] exsm:text-[1rem] uppercase rounded-[0.625rem] h-[3rem] exsm:h-[3.25rem] exsm:pb-1 px-3 exsm:px-4 tracking-[1px]">
           yes, restart
          </button>
        </div>
      </div>
    </div>
  );
}
