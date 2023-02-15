"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// routes
import { ROUTES } from "@/routes";

// zustand: states
import { useUser } from "@/store/user";

// queries & mutations
import { useSignMutation } from "@/queries/useSignMutation";
import { useGetUserSessionQuery } from "@/queries/useGetUserSessionQuery";

// components
import { Button, LoadingStatus } from "@/components";
import useAmountAuthRoute from "@/hooks/useAmountAuthRoute";
import { supabase } from "@/lib/initSupabase";

// ::
const Home = () => {
  const router = useRouter();
  const userLoader = useUser();

  const userSession = useGetUserSessionQuery();
  const signWithGoogle = useSignMutation();

  useEffect(() => {
    if (userLoader?.email) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [userLoader]);

  return (
    <main className="pattern-wavy pattern-blue-500 dark:pattern-zinc-800 dark:pattern-bg-zinc-900 pattern-bg-zinc-900 pattern-opacity-100 pattern-size-16">
      <div className="flex container mx-auto px-4 items-center justify-center min-h-screen">
        <div className="max-w-2xl flex flex-col gap-2 items-center">
          <div className="flex flex-col gap-2 mb-10 items-center justify-center text-center">
            <h1 className="text-5xl">
              Welcome to <span className="text-blue-600 font-bold">XAMA</span>
            </h1>
            <p className="text-xl">Use Xama to communicate with your folks!</p>
          </div>
          <div className="w-full flex gap-2 flex-wrap justify-center">
            <Button
              className="max-w-xs w-full font-semibold bg-blue-600 border-b-4 border-blue-900"
              onClick={() => signWithGoogle.mutate("google")}
            >
              Login with Google
            </Button>
          </div>
          {userSession.isFetching && (
            <div className="flex gap-5 items-center justify-start">
              <LoadingStatus />
              <p className="animate-pulse text-lg">Loading...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
