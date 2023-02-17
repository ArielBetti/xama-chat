// import { supabase } from '@/lib/initSupabase';
import { supabase } from "@/lib/initSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditorState } from "draft-js";

// utils
import { SerializeMessage } from "@/utils/serializeMessage";

// types
export type TUseCreateChannelMutation = {
  userId: string;
  slug: string;
  description: string;
};

export const useCreateChannelMutation = () => {
  const queryClient = useQueryClient();

  // Queries
  return useMutation({
    mutationFn: async ({
      description,
      slug,
      userId,
    }: TUseCreateChannelMutation) => {
      const { data } = await supabase
        .from("channels")
        .insert({
          slug,
          created_by: userId,
          description,
        })
        .select("id");

      await supabase.from("connections").insert({
        user_id: userId,
        channel_id: data?.[0]?.id,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user-connections"]);
    },
  });
};
