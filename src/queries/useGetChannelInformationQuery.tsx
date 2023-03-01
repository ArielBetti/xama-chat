"use client";

import { TConnections } from "@/interfaces";
import { supabase } from "@/lib/initSupabase";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelInformationQuery = (id: number) => {
  // Queries
  return useQuery({
    queryKey: ["channel-invitation"],
    queryFn: async () => {
      const { data } = await supabase
      .rpc('getinvitation', {
        invitationid: id
      })

      return data?.[0] as TConnections;
    },
    refetchOnWindowFocus: false,
  });
};
