"use client";

import useAmountAuthRoute from "@/hooks/useAmountAuthRoute";
import React from "react";
import { twMerge } from "tailwind-merge";
import ProfilePicture from "../ProfilePicture";
import { TChatBallon } from "./types";

const ChatBallon = ({ message }: TChatBallon) => {
  const { userLoader } = useAmountAuthRoute();

  return (
    <div className="border-t border-zinc-800 flex py-5 max-w-7xl justify-start">
      <div className="flex gap-5 items-start justify-start md:flex-nowrap flex-wrap">
        <ProfilePicture
          url={`${message?.users?.picture}`}
          fallback={`${message?.users?.username}`}
        />
        <div className="flex flex-col justify-start gap-2">
          <div className="flex gap-5 items-baseline justify-start">
            <span
              className={twMerge(
                "font-semibold flex flex-wrap",
                userLoader?.sessionId === message?.user_id && "text-blue-500"
              )}
            >
              {message?.users?.username}
            </span>
            <span className="text-xs">
              {Intl.DateTimeFormat("pt-BR", {
                hour: "numeric",
                dayPeriod: "short",
                minute: "numeric",
              }).format(new Date(`${message.inserted_at}`))}
            </span>
          </div>
          <div className="flex flex-wrap">{message.message}</div>
        </div>
      </div>
    </div>
  );
};

export default ChatBallon;
