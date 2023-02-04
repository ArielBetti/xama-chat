import { Dispatch, ReactNode, SetStateAction } from "react";

export type TCardProps = {
  children: ReactNode,
  className?: string,
  counter?: number,
  setCounter?: Dispatch<SetStateAction<number>>
};
