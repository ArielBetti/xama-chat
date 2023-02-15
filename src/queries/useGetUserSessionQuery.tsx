"user client";

import { supabase } from "@/lib/initSupabase";
import { useAuthActions } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSessionQuery = () => {
  const { setUser } = useAuthActions();

  // Queries
  return useQuery({
    queryKey: ["user-session"],
    queryFn: () => supabase.auth.getSession(),
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: async (response) => {
      if (response.data?.session?.user?.user_metadata?.email) {
        await supabase
          .from("users")
          .update({
            picture: `${response?.data?.session?.user.user_metadata?.avatar_url}`,
          })
          .eq("id", `${response?.data?.session?.user?.id}`);
        setUser({
          sessionId: `${response?.data?.session?.user?.id}`,
          email: `${response?.data?.session?.user.user_metadata?.email}`,
          name: `${response?.data?.session?.user.user_metadata?.name}`,
          picture: `${response?.data?.session?.user.user_metadata?.avatar_url}`,
        });
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          await supabase
            .from("users")
            .update({
              picture: `${session?.user.user_metadata?.avatar_url}`,
            })
            .eq("id", `${session?.user?.id}`);
          if (session?.user.id) {
            setUser({
              sessionId: `${session?.user?.id}`,
              email: `${session?.user.user_metadata?.email}`,
              name: `${session?.user.user_metadata?.name}`,
              picture: `${session?.user.user_metadata?.avatar_url}`,
            });
          }
        }
      );

      return () => {
        listener?.subscription.unsubscribe();
      };
    },
  });
};
