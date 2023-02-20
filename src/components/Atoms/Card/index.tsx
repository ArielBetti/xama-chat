import { twMerge } from "tailwind-merge";

// types
import { TCardProps } from "./types";

// ::
const Card = ({ children, className }: TCardProps) => {
  return (
    <div className={twMerge('w-full max-w-2xl animate-fadeIn gap-2 p-4 dark:bg-zinc-800 rounded-md shadow-md bg-white', className)}>
      {children}
    </div>
  );
};

export default Card;
