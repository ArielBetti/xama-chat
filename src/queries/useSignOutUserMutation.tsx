// import { supabase } from '@/lib/initSupabase';
import { supabase } from '@/lib/initSupabase';
import { ROUTES } from '@/routes';
import { useAuthActions } from '@/store/user';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';

export const useSignOutUserMutation = () => {
  const router = useRouter();
  const { logout } = useAuthActions();

  // Queries
  return useMutation({
    mutationFn: () => supabase.auth.signOut(),
    onSuccess: () => {
      logout();
      router.push(ROUTES.LOGIN);
    },
  });
};
