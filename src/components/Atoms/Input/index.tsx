import { useId } from "react";

// types
import type { TInput } from "./types";

// ::
const Input = ({ label, feedback, ...rest }: TInput) => {
  const inputId = useId();

  return (
    <div className="flex flex-col justify-start items-start w-full gap-2">
      {label && (
        <label htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className="w-full p-2 outline-none focus:dark:bg-black dark:bg-zinc-900 dark:placeholder:text-zinc-400 rounded-md shadow-md bg-white placeholder:text-zinc-600"
        {...rest}
        id={inputId}
        name={inputId}
      />
    </div>
  );
};

export default Input;
