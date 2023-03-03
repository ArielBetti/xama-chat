// import { supabase } from '@/lib/initSupabase';
import { supabase } from "@/lib/initSupabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// utils
import { useChannelActions } from "@/store/channel";

// types
export type TUseCreateChannelMutation = {
  userId: string;
  slug: string;
  description: string;
};

export const useCreateChannelMutation = () => {
  const { setchannel } = useChannelActions();
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
        .select("*");

      await supabase.from("connections").insert({
        id: `${userId}${data?.[0]?.id || crypto.randomUUID()}`,
        user_id: userId,
        channel_id: data?.[0]?.id,
      });

      if (data?.[0]?.id) {
        setchannel({
          id: data?.[0]?.id,
          title: data?.[0]?.slug,
          description: data?.[0]?.description,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user-connections"]);
    },
  });
};
