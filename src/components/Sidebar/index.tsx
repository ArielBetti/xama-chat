import React from "react";
import ProfilePicture from "../ProfilePicture";
import UserStatus from "../UserStatus";
import { TSidebar } from "./types";

const Sidebar = ({ header, user }: TSidebar) => {
  return (
    <div className="max-w-xs w-full fixed left-0 top-0 bg-black-piano-1 h-full flex flex-col justify-start items-center shadow-[0px_0px_5px_] shadow-black-piano-1">
      <div className="shadow-[-1px_0px_5px] h-14 shadow-black/80 w-full flex items-center justify-start">
        <div className="p-4">{header}</div>
      </div>
      <div className="h-full p-4 flex flex-col w-full overflow-auto gap-2">
        <button className="flex px-2 py-4 bg-zinc-800 rounded-md shadow-md">
          <div className="whitespace-nowrap truncate">
            <span>teste</span>
          </div>
        </button>
      </div>
      <div className="p-4 items-end justify-start bg-black-piano-2 w-full flex object-cover">
        <div className="flex items-center justify-between">
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
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
