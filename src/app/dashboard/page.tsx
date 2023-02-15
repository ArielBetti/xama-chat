"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// hooks
import useAmountAuthRoute from "@/hooks/useAmountAuthRoute";
import useObserveMessages from "@/hooks/useObserveMessages";

// store
import { useChannel } from "@/store/channel";

// components
import { Button, ChatBallon, Header, Sidebar, TextEditor } from "@/components";

// routes
import { ROUTES } from "@/routes";
import { supabase } from "@/lib/initSupabase";
import { TUserStatus } from "@/interfaces";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { convertToRaw, EditorState } from "draft-js";
import { SerializeMessage } from "@/utils/serializeMessage";

// ::
const Dashboard = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const [userStatus, setUserStatus] = useState<TUserStatus>("OFFLINE");
  const { userLoader } = useAmountAuthRoute();
  const router = useRouter();
  const channels = useChannel();
  const messages = useObserveMessages(channels?.id || 0);

  const sendMessage = async () => {
    await supabase.from("messages").insert({
      message: SerializeMessage(editorState),
      user_id: userLoader?.sessionId,
      channel_id: channels?.id,
    });
  };

  useEffect(() => {
    if (!userLoader?.email && userLoader !== undefined) {
      router.push(ROUTES.LOGIN);
    }

    if (userLoader?.email) {
      const channel = supabase.channel("user_status", {
        config: {
          presence: {
            key: userLoader?.sessionId,
          },
        },
      });

      channel.subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          const presenceTrackStatus = await channel.track({
            user: userLoader?.sessionId,
            online_at: new Date().toISOString(),
          });
          const { data } = await supabase
            .from("users")
            .update({
              status: presenceTrackStatus === "ok" ? "ONLINE" : "OFFLINE",
            })
            .eq("id", userLoader?.sessionId)
            .select("status");

          setUserStatus(data?.[0].status);
        }
      });

      async () => {
        await supabase
          .from("users")
          .update({
            status: "OFFLINE",
          })
          .eq("id", userLoader?.sessionId);
        channel.unsubscribe();
      };
    }
  }, [userLoader]);

  return (
    <div className="h-screen flex">
      <Sidebar
        userStatus={userStatus}
        user={userLoader || null}
        header={<h1>Channels</h1>}
      />
      <div className="relative flex flex-col h-full w-full">
        <Header title={`${channels?.title}`} />
        <div className="gap-5 flex py-16 pb-5 flex-col md:px-10 px-4 max-w-5 xl h-full overflow-auto">
          {messages.map((message) => (
            <ChatBallon key={message.id} message={message} />
          ))}
        </div>
        {channels?.id !== 0 && (
          <div className="flex w-full min-h-[70px] max-h-[300px] min-h-20 justify-center items-center bg-black-piano-2/80 px-6 gap-2">
            <TextEditor
              editorState={editorState}
              setEditorState={setEditorState}
            />
            <Button onClick={() => sendMessage()}>
              <PaperAirplaneIcon className="h-6 w-6" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
