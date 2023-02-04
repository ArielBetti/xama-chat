import { ProfilePicture, Sidebar } from "@/components";
import useAmountAuthRoute from "@/hooks/useAmountAuthRoute";
import { supabase } from "@/lib/initSupabase";
import { useSignOutUserMutation } from "@/queries/useSignOutUserMutation";

export default function Teste() {
  const { userLoader } = useAmountAuthRoute();
  const signOut = useSignOutUserMutation();

  const test = async () => {
    const { data, error } = await supabase.from("users").select("*");
  };

  return (
    <>
      {userLoader?.name}
      <ProfilePicture
        url={`${userLoader?.picture}`}
        fallback={`${userLoader?.name}`}
      />
      <Sidebar user={userLoader || null} header={<h1>Channels</h1>} />
      <button onClick={() => test()}>get</button>
      <button onClick={() => signOut.mutate()}>Sair</button>
    </>
  );
}
