"use client";
import { useEffect, useState } from "react";

import { TMessage, TMessagesChanel } from "@/interfaces";
import { supabase } from "@/lib/initSupabase";

const useObserveMessages = (channelId: number) => {
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
      .eq("channel_id", channelId);

    return setMessages(data || []);
  };

  useEffect(() => {
    setMessages([]);
    getHistoryMessages();

    if (channelId) {
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

            Promise.all(data);

            if (
              response.eventType === "INSERT" &&
              response.new?.channel_id === channelId
            ) {
              setMessages((prev) => [
                ...prev,
                { ...response.new, users: data?.[0] },
              ]);
            }
            if (
              response.eventType === "DELETE" &&
              response.new?.channel_id === channelId
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
  }, [channelId]);

  return messages;
};

export default useObserveMessages;
