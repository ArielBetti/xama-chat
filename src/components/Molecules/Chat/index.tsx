import React, { useEffect, useLayoutEffect, useMemo, useRef } from "react";

// components
import { ChatBallon } from "@/components";
import useObserveMessages from "@/hooks/useObserveMessages";
import { TChatProps } from "./type";
import { useChannelActions, useMessageIsLoaded } from "@/store/channel";

// ::
const Chat = ({ channel }: TChatProps) => {
  const chatRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messages = useObserveMessages(channel);
  const messageLoaded = useMessageIsLoaded();
  const { setIsLoaded } = useChannelActions();

  const handleScrollToLastMessage = (type: "load" | "message" = "message") => {
    if (type === "load") {
      chatRef.current?.scroll({
        behavior: "smooth",
        top: chatRef?.current?.scrollHeight,
      });
    }
    if (type === "message") {
      lastMessageRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const scrollPosition =
      ((Number(chatRef.current?.scrollTop) +
        Number(chatRef.current?.clientHeight)) /
        Number(chatRef.current?.scrollHeight)) *
      100;

    if (scrollPosition > 80) {
      handleScrollToLastMessage();
    }
  }, [messages]);

  useEffect(() => {
    if (messageLoaded) {
      setTimeout(() => {
        handleScrollToLastMessage("load");
      }, 250);
    }
  }, [messageLoaded]);

  if (messages.length === 0)
    return (
      <div className="gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto"></div>
    );

  return (
    <div
      ref={chatRef}
      className="gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto"
    >
      {messages.map((message) => (
        <ChatBallon ref={lastMessageRef} key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Chat;
