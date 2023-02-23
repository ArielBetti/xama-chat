"use client";
import React, { useEffect, useRef, useState } from "react";
import { Virtuoso, VirtuosoHandle } from "react-virtuoso";

// components
import { ChatBallon } from "@/components";
import useObserveMessages from "@/hooks/useObserveMessages";
import { TChatProps } from "./type";
import {
  useChannelActions,
  useNewMessages,
} from "@/store/channel";

// ::
const Chat = ({ channel }: TChatProps) => {
  const [lastRangeMessage, setLastRangeMessage] = useState(0);
  const newMessages = useNewMessages();
  const { setNewMessages } = useChannelActions();
  const chatRef = useRef<VirtuosoHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messages = useObserveMessages(channel);

  useEffect(() => {
    if (lastRangeMessage > 0 && lastRangeMessage < messages?.length - 2)
      setNewMessages(newMessages + 1);
  }, [messages]);

  if (messages.length === 0)
    return (
      <div className="gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto"></div>
    );

  return (
    <div
      ref={containerRef}
      className="relative gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto"
    >
      <Virtuoso
        alignToBottom
        ref={chatRef}
        atBottomStateChange={() => setNewMessages(0)}
        rangeChanged={(range) => setLastRangeMessage(range.endIndex)}
        followOutput={"smooth"}
        initialTopMostItemIndex={messages.length}
        style={{ height: "100%" }}
        totalCount={messages.length}
        data={messages}
        itemContent={(_index, message) => (
          <ChatBallon ref={lastMessageRef} key={message.id} message={message} />
        )}
      />
    </div>
  );
};

export default Chat;
