// import { supabase } from '@/lib/initSupabase';
import { signInWithGoogle } from '@/pages/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useSignWithGoogleMutation = () => {
  // Queries
  return useMutation({
    mutationFn: () => signInWithGoogle(),
  });
};
