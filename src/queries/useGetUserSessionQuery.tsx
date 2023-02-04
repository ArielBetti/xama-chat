import { supabase } from "@/lib/initSupabase";
import { useAuthActions, useUser } from "@/store/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserSessionQuery = () => {
  const { setUser } = useAuthActions();

  // Queries
  return useQuery({
    queryKey: ['user-session'],
    queryFn: () => supabase.auth.getSession(),
    refetchOnWindowFocus: false,
    retry: 1,
    onSuccess: (response) => {
      if (response.data?.session?.user?.user_metadata?.email) {
        setUser({
          email: `${response?.data?.session?.user.user_metadata?.email}`,
          name: `${response?.data?.session?.user.user_metadata?.name}`,
          picture: `${response?.data?.session?.user.user_metadata?.avatar_url}`,
        });
      }

      const { data: listener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          setUser({
            email: `${session?.user.user_metadata?.email}`,
            name: `${session?.user.user_metadata?.name}`,
            picture: `${session?.user.user_metadata?.avatar_url}`,
          });
        }
      );

      return () => {
        listener?.subscription.unsubscribe();
      };
    },
  });
};
