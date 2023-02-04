import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { twMerge } from "tailwind-merge";

// types
import type { TButton } from "./types";

// ::
const Button = forwardRef<HTMLButtonElement, TButton>(
  ({ children, asChild = false, className, ...rest }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        {...rest}
        ref={ref}
        className={twMerge(
          "flex bg-indigo-600 border-b-4 border-indigo-900 cursor-pointer items-center justify-center gap-1 rounded-md p-2 text-white shadow-md transition-colors hover:bg-primary-dark-contrast",
          className
        )}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;
