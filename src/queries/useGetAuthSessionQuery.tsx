"user client";

import { supabase } from "@/lib/initSupabase";
import { useQuery } from "@tanstack/react-query";

export const useGetAuthSessionQuery = () => {
  // Queries
  return useQuery({
    queryKey: ["user-auth-session"],
    queryFn: () => supabase.auth.getSession(),
    refetchOnWindowFocus: false,
    retry: 1,
  });
};
