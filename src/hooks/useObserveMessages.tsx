"use client";
import { useEffect, useState } from "react";

import { TChannel, TMessage, TMessagesChanel } from "@/interfaces";
import { supabase } from "@/lib/initSupabase";
import { useChannelActions } from "@/store/channel";

const useObserveMessages = (currentChannel: TChannel | null) => {
  const { setIsLoaded } = useChannelActions();
  const channel = supabase.channel("user_messages");
  const [messages, setMessages] = useState<TMessage[]>([]);

  const getHistoryMessages = async () => {
    const { data } = await supabase
      .from("messages")
      .select(
        `
      *,
      users (
        username,
        picture
      )
      `
      )
      .eq("channel_id", currentChannel?.id);

    setMessages(data || []);
    setIsLoaded(true);
  };

  useEffect(() => {
    setIsLoaded(false);
    setMessages([]);
    getHistoryMessages();

    if (currentChannel?.id) {
      supabase.from("messages");
      channel
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "messages",
          },
          async (payload) => {
            const response: TMessagesChanel = payload as TMessagesChanel;

            const { data }: any = await supabase
              .from("users")
              .select(
                `
                  username,
                  picture
                `
              )
              .eq("id", response?.new?.user_id);

            if (
              response.eventType === "INSERT" &&
              response.new?.channel_id === currentChannel?.id
            ) {
              setMessages((prev) => [
                ...prev,
                { ...response.new, users: data?.[0] },
              ]);
            }
            if (
              response.eventType === "DELETE" &&
              response.new?.channel_id === currentChannel?.id
            ) {
              setMessages((prev) =>
                prev.filter((item) => item.id !== response.old.id)
              );
            }
          }
        )
        .subscribe();
    }

    () => {
      channel.unsubscribe();
    };
  }, [currentChannel]);

  return messages;
};

export default useObserveMessages;
