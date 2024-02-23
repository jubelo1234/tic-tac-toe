import logo from "../assets/logo.svg";
import xSilver from "../assets/icon-x-silver.svg";
import xBlack from "../assets/icon-x-dark.svg.svg";
import oSilver from "../assets/icon-o-silver.svg";
import oBlack from "../assets/icon-o-dark.svg";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center">
        <img src={logo} alt="logo" className="h-[2rem]" />
      </div>
      <div className="mt-[2rem] uppercase flex items-center flex-col justify-center bg-semi-dark-navy w-full shadow-pick pt-6 pb-7 px-6 rounded-[0.9375rem]">
        <h2 className="text-[1rem] font-bold tracking-[1px] text-silver-cl">
          Pick player 1's mark
        </h2>
        <div className="h-[4.5rem] relative mt-[1.5rem] w-full flex items-center rounded-[0.625rem] bg-dark-navy justify-center">
          <button className=" cursor-pointer relative z-10 w-1/2 flex items-center justify-center">
            <img src={xSilver} alt="option x" className=" size-[32px]" />
          </button>
          <button className="w-1/2 cursor-pointer relative z-10 flex items-center justify-center">
            <img src={oBlack} alt="option o" className=" size-[32px]" />
          </button>
          <div
            className="bg-silver-cl z-0 top-1/2 transform -translate-y-1/2 right-[0.5rem] absolute rounded-[0.625rem]"
            style={{ width: "calc(50% - 0.5rem", height: "calc(100% - 1rem)" }}
          ></div>
        </div>
        <h4 className="mt-[1.0625rem] font-medium opacity-50 text-silver-cl text-[0.875rem] tracking-[0.875px]">
          remember: x goes first
        </h4>
      </div>
      <div className="w-full space-y-[1rem] mt-[2rem] ">
        <button className="w-full shadow-vcp uppercase h-[3.5rem] text-center px-1 bg-light-yellow transition-all duration-300 hover:bg-light-yellow-hover text-[1rem] font-bold text-dark-navy tracking-[1.25px] rounded-[0.9375rem] cursor-pointer"> new game (vs cpu)</button>
        <button className="w-full shadow-vpl uppercase h-[3.5rem] text-center px-1 bg-silver-cl transition-all duration-300 hover:bg-silver-hover text-[1rem] font-bold text-dark-navy tracking-[1.25px] rounded-[0.9375rem] cursor-pointer"> new game (vs player)</button>
      </div>
    </div>
  );
}
