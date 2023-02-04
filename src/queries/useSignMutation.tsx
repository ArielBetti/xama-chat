// import { supabase } from '@/lib/initSupabase';
import { supabase } from "@/lib/initSupabase";
import { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

export const useSignMutation = () => {
  // Queries
  return useMutation({
    mutationFn: (provider: Provider) => supabase.auth.signInWithOAuth({
        provider: provider,
      }),
  });
};
