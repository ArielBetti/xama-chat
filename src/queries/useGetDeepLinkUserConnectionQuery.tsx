"use client";

import { TConnections } from "@/interfaces";
import { supabase } from "@/lib/initSupabase";
import { useChannelActions } from "@/store/channel";
import { useQuery } from "@tanstack/react-query";

export const useGetDeepLinkUserConnectionQuery = (
  id: number,
  enable: boolean
) => {
  const { setchannel } = useChannelActions();

  // Queries
  return useQuery({
    queryKey: ["user-deeplink-connection"],
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
        )
        .eq("id", id);

      return data;
    },
    enabled: enable,
    refetchOnWindowFocus: false,
    onSuccess: (channel) => {
      const channelData = channel.data?.[0] as TConnections;

      if (channelData?.id) {
        setchannel({
          id: channelData.id,
          title: channelData.slug,
          description: channelData?.description,
        });
      }
    },
  });
};
