"use client";

import { TConnections } from "@/interfaces";
import { supabase } from "@/lib/initSupabase";
import { useAuthActions } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelsInConnectionsQuery = () => {
  const { setChannels } = useAuthActions();

  // Queries
  return useQuery({
    queryKey: ["user-connections"],
    queryFn: async () => {
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
      const { data: userConnections } = await supabase
        .from("connections")
        .select("*")
        .eq("user_id", userId);

      const data = await supabase
        .from("channels")
        .select(`*`)
        .filter(
          "id",
          "in",
          `(${userConnections?.map((item) => item?.channel_id).toString()})`
        );

      setChannels(data?.data as unknown as TConnections[]);
      return data;
    },
  });
};
