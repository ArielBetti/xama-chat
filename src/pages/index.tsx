import { useSignWithGoogleMutation } from "@/queries/useSignWithGoogleMutation";
import { supabase } from "@/lib/initSupabase";
import { useAuthActions } from "@/store/user";

export default function Home() {
  const signWithGoogle = useSignWithGoogleMutation();

  return (
    <>
      <button onClick={() => signWithGoogle.mutate()}>Logar com google</button>
      <button onClick={() => supabase.auth.getUser()}>Get user</button>
      <button onClick={() => supabase.auth.signOut()}>Logout</button>
    </>
  );
}
