// import { supabase } from '@/lib/initSupabase';
import { supabase } from "@/lib/initSupabase";
import { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type TUseSignMutation = {
  provider: Provider,
  options?: {
    redirectTo?: string,
  }
};

export const useSignMutation = () => {
  // Queries

  return useMutation({
    mutationFn: (params: TUseSignMutation) =>
      supabase.auth.signInWithOAuth({
        provider: params.provider,
        options: {
          redirectTo: params.options?.redirectTo,
        },
      }),
  });
};
