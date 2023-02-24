// import { supabase } from '@/lib/initSupabase';
import { supabase } from "@/lib/initSupabase";
import { Provider } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";

type TUseSignMutation = {
  provider: Provider;
  redirectTo?: string;
};

export const useSignMutation = ({ provider, redirectTo }: TUseSignMutation) => {
  // Queries

  console.log(redirectTo);

  return useMutation({
    mutationFn: () =>
      supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo,
        },
      }),
  });
};
