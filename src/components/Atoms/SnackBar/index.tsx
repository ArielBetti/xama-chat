import { useNewMessages } from "@/store/channel";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Snackbar = ({ className, ...rest }: HTMLAttributes<HTMLDivElement>) => {
  const newMessages = useNewMessages();

  if (!newMessages) return null;

  return (
    <div
      {...rest}
      className={twMerge(
        "rounded-md bg-blue-500/50 backdrop-blur-md p-2 flex justify-center items-center gap-2",
        className
      )}
    >
      {newMessages} Novas Mensagens
    </div>
  );
};

export default Snackbar;
