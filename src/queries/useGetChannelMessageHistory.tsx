import { supabase } from "@/lib/initSupabase";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelMessageHistory = (id: string) => {
  // Queries
  return useQuery({
    queryKey: ["channel-message-history"],
    queryFn: async () => {
      const { data } = await supabase
        .from("messages")
        .select(`*`)
        .eq("channel_id", id);

      return data;
    },
  });
};
