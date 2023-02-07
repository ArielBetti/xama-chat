import React, { useState } from "react";

// radix: components
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";


// types
import { THeaderProps } from "./types";

// icons
import PopMenu from "../PopMenu";

// ::
const Header = ({ title }: THeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute w-full">
      <div className="relative z-10 md:px-10 px-4 top-0 left-0 w-full h-14 bg-black-piano-1/80 backdrop-blur-lg flex gap-5 items-center justify-start">
        <div className="md:hidden flex">
          <PopMenu>
            <DropdownMenuItem>
              <button>
                Teste
              </button>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <button>
                Teste
              </button>
            </DropdownMenuItem>
          </PopMenu>
        </div>
        <div>{title}</div>
      </div>
    </div>
  );
};

export default Header;
