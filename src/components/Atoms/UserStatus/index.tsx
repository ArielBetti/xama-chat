import React from "react";
import { TUserStatusProps } from "./types";
import { colorStatus } from './colors'

const UserStatus = ({ status = 'OFFLINE' }: TUserStatusProps) => {
  return (
    <div className="flex gap-2 items-center text-xs">
      <div
        className="h-3 w-3 rounded-full"
        style={{ background: colorStatus[status] }}
      ></div>
      {status}
    </div>
  );
};

export default UserStatus;
