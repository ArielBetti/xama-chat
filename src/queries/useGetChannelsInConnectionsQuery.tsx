"use client";

import { supabase } from "@/lib/initSupabase";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelsInConnectionsQuery = () => {
  // Queries
  return useQuery({
    queryKey: ["user-connections"],
    queryFn: async () => {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      const { data: userConnections } = await supabase
        .from("connections")
        .select("*")
        .eq("user_id", userId);

      console.log("connections", userConnections);

      const data = await supabase
        .from("channels")
        .select(`*`)
        .filter(
          "id",
          "in",
          `(${userConnections?.map((item) => item?.channel_id).toString()})`
        );

      return data;
    },
  });
};
