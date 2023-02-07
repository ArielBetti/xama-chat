import {
  ArrowLeftOnRectangleIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import ProfilePicture from "../ProfilePicture";
import UserStatus from "../UserStatus";
import { TSidebar } from "./types";

// radix: components
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import PopMenu from "../PopMenu";
import { useSignOutUserMutation } from "@/queries/useSignOutUserMutation";

const Sidebar = ({ header, user }: TSidebar) => {
  const logout = useSignOutUserMutation();

  return (
    <div className="z-10 md:flex hidden max-w-xs w-full bg-black-piano-1/80 backdrop-blur-lg h-full flex-col justify-start items-center shadow-[0px_0px_5px_] shadow-black-piano-1">
      <div className="h-14 w-full flex items-center justify-start">
        <div className="px-4">{header}</div>
      </div>
      <div className="h-full p-4 flex flex-col w-full overflow-auto gap-2">
        <button className="flex px-2 py-4 bg-zinc-800 rounded-md shadow-md">
          <div className="whitespace-nowrap truncate">
            <span>teste</span>
          </div>
        </button>
      </div>
      <div className="px-4 h-20 items-center justify-start bg-black-piano-2 w-full flex object-cover">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-start justify-start gap-2">
            <ProfilePicture
              url={`${user?.picture}`}
              fallback={`${user?.name}`}
            />
            <div className="flex flex-col items-start justify-start">
              <h2 className="max-w-[120px] whitespace-nowrap truncate">
                {user?.name}
              </h2>
              <UserStatus status="OFFLINE" />
            </div>
          </div>
          <PopMenu>
            <DropdownMenuItem
              onClick={() => logout.mutate()}
              className="cursor-pointer shadow-md bg-red-600 gap-2 w-full flex items-center justify-start p-2 rounded-md"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5" />
              Sair
            </DropdownMenuItem>
          </PopMenu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
