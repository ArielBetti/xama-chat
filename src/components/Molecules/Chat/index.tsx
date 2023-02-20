import React, { useEffect, useMemo, useRef } from "react";

// components
import { ChatBallon } from "@/components";
import useObserveMessages from "@/hooks/useObserveMessages";
import { TChatProps } from "./type";
import {
  useChannelActions,
  useMessageIsLoaded,
  useNewMessages,
} from "@/store/channel";
import { getScrollPosition } from "@/utils/getScrollPosition";

// ::
const Chat = ({ channel }: TChatProps) => {
  const newMessages = useNewMessages();
  const { setNewMessages } = useChannelActions();
  const chatRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const messages = useObserveMessages(channel);
  const messageLoaded = useMessageIsLoaded();

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
    const scrollPosition = getScrollPosition({
      clientHeight: Number(chatRef.current?.scrollTop),
      scrollHeight: Number(chatRef.current?.clientHeight),
      scrollTop: Number(chatRef.current?.scrollHeight),
    });

    if (scrollPosition > 80) {
      handleScrollToLastMessage();
    }
    if (scrollPosition < 80) {
      setNewMessages(newMessages + 1);
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
      onScrollCapture={(e) => {
        const scrollPosition = getScrollPosition({
          clientHeight: e.currentTarget?.clientHeight,
          scrollHeight: e.currentTarget?.scrollHeight,
          scrollTop: e.currentTarget?.scrollTop,
        });
        if (scrollPosition > 99) {
          setNewMessages(0);
        }
      }}
      ref={chatRef}
      className="relative gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto"
    >
      {messages.map((message) => (
        <ChatBallon ref={lastMessageRef} key={message.id} message={message} />
      ))}
    </div>
  );
};

export default Chat;
