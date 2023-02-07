// icons
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

// radix: components
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { TPopMenuProps } from "./types";

// ::
const PopMenu = ({ children }: TPopMenuProps) => {
  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="flex items-center justify-center">
        <EllipsisVerticalIcon className="h-6 w-6" />
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="flex flex-col gap-2 m-2 min-w-[200px] w-full shadow-lg p-5 bg-black-piano-2/70 backdrop-blur-lg rounded-md">
        {children}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default PopMenu;
