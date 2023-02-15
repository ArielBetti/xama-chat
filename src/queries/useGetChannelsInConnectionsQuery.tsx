'use client'

import { supabase } from "@/lib/initSupabase";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelsInConnectionsQuery = () => {
  // Queries
  return useQuery({
    queryKey: ["user-connections"],
    queryFn: async () => {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      const { data: userConnections } = await supabase
        .from("users")
        .select(`connections`)
        .eq("id", userId);

      const data = await supabase
        .from("channels")
        .select(`*`)
        .filter(
          "id",
          "in",
          `(${userConnections?.map((item) => item?.connections).toString()})`
        );

      return data;
    },
  });
};
