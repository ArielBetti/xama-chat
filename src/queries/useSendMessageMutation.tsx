// import { supabase } from '@/lib/initSupabase';
import { supabase } from "@/lib/initSupabase";
import { useMutation } from "@tanstack/react-query";
import { EditorState } from "draft-js";

// utils
import { SerializeMessage } from "@/utils/serializeMessage";

// types
export type TUseSendMessageMutation = {
  userId: string;
  channelId: number;
  message: EditorState;
};

export const useSendMessageMutation = () => {
  // Queries
  return useMutation({
    mutationFn: async ({
      channelId,
      message,
      userId,
    }: TUseSendMessageMutation) =>
      await supabase.from("messages").insert({
        message: SerializeMessage(message),
        user_id: userId,
        channel_id: channelId,
      }),
  });
};
