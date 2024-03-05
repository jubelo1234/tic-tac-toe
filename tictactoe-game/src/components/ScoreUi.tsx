type ScoreUiProps = {
  player: string;
  title: string;
  score: number
}

export default function ScoreUi({player, title, score}: ScoreUiProps) {
  return (
    <div className={`uppercase flex items-center justify-center gap-[4px] flex-col size-[26.5vw] ${title === "tie" ? "bg-silver-cl" : player === "X" ? " bg-light-blue" : "bg-light-yellow"} h-[3.8rem] exsm:h-[4rem] rounded-[0.9375rem] tab:h-[4.5rem] tab:w-[140px] text-dark-navy`}>
      <p className="font-medium uppercase text-[0.82rem] exsm:text-[0.875rem] tracking-[0.875px] leading-[1.125rem]">
        {title}
      </p>
      <span className="font-bold text-[1.0625rem] exsm:text-[1.125rem] tracking-[1.125px] leading-none">
        {score}
      </span>
    </div>
  );
}
