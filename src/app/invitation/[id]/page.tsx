"use client";

import { Button } from "@/components";
import { useSignMutation } from "@/queries/useSignMutation";
import { useUser } from "@/store/user";
import { ROUTES } from "@/routes";
import { supabase } from "@/lib/initSupabase";
import { useGetChannelInformationQuery } from "@/queries/useGetChannelInformationQuery";
import Skeleton from "../skeleton";
import { useGetAuthSessionQuery } from "@/queries/useGetAuthSessionQuery";

const Invitation = ({ params: { id } }: { params: { id: number } }) => {
  const { data: authData, isFetching: fetchingAuthData } =
    useGetAuthSessionQuery();
  const { data, isFetching, isError } = useGetChannelInformationQuery(id);
  const userLoader = useUser();
  const signWithGoogle = useSignMutation();

  const handleAceptInvitation = async () => {
    const preCheck = await supabase.rpc("precheckchannel", {
      channelid: `${userLoader?.sessionId}${data?.id}`,
    });

    if (preCheck.data?.length === 0) {
      console.log('caiu aqui');
      await supabase.from("connections").insert({
        id: `${userLoader?.sessionId}${data?.id}`,
        channel_id: data?.id,
        user_id: userLoader?.sessionId,
      });
    }

    signWithGoogle.mutate({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}${ROUTES.DASHBOARD}?channel=${data?.id}`,
      },
    });
  };

  if (isFetching || fetchingAuthData) {
    return <Skeleton />;
  }

  if (!authData?.data?.session?.access_token) {
    return (
      <div className="text-center container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl">
          Parece que você foi convidado para participar de uma comunidade.
        </h2>
        <p className="text-xl mt-5">Faça login para visualizar o convite!</p>
        <Button
          className="mt-10 max-w-xs w-full font-semibold"
          onClick={() => handleAceptInvitation()}
        >
          Entrar com google
        </Button>
      </div>
    );
  }

  if (!data && !isFetching) {
    return (
      <div className="text-center container mx-auto px-4 flex flex-col items-center justify-center min-h-screen">
        <h2 className="font-semibol text-3xl">Não encontramos esse canal :(</h2>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center flex flex-col gap-2 items-center ">
        <p className="text-xl">
          Você foi convidado para participar do canal:{" "}
          <span className="font-semibold text-blue-500">{data?.slug}</span>!
        </p>
        <span>{data?.description}</span>
      </div>
      <Button
        className="mt-10 max-w-xs w-full font-semibold"
        onClick={() => handleAceptInvitation()}
      >
        Aceito o convite!
      </Button>
    </div>
  );
};

export default Invitation;
