import logo from "../assets/logo.svg";
import xIcon from "../assets/icon-x.svg";
import oIcon from "../assets/icon-o.svg";
import resIcon from "../assets/icon-restart.svg";
import Square from "./Square";

export default function GamePage() {
  return (
    <div className="w-full max-w-[550px] tab:max-w-[460px] mx-auto">
      <div className="flex justify-between items-center">
        <div className="w-fit flex items-center justify-center">
          <img src={logo} alt="logo" className="h-[2rem]" />
        </div>
        <div className="flex justify-center items-center pb-[4px] gap-[0.8125rem] rounded-[0.625rem] h-[2.5rem] w-[6rem] bg-semi-dark-navy shadow-turn">
          <img src={xIcon} alt="turns" className=" size-[16px]" />
          <p className=" leading-none font-medium text-[0.875rem] uppercase text-silver-cl">Turn</p>
        </div>
        <button className="size-[2.5rem] grid place-items-center cursor-pointer rounded-[10px] shadow-res bg-silver-cl">
          <img src={resIcon} alt="restart" className="size-[16px]" />
        </button>
      </div>
      <div className="mt-10 space-y-[1.25rem]">
        <div className="flex items-center justify-between gap-[3vw]">
            <Square/>
            <Square/>
            <Square/>
        </div>
        <div className="flex items-center justify-between gap-[3vw]">
            <Square/>
            <Square/>
            <Square/>
        </div>
        <div className="flex items-center justify-between gap-[3vw]">
            <Square/>
            <Square/>
            <Square/>
        </div>
      </div>
    </div>
  );
}
