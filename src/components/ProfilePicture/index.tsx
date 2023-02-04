import Avvvatars from "avvvatars-react";

// radix: components
import * as Avatar from "@radix-ui/react-avatar";

// types
import type { TProfilePicture } from "./types";

// ::
const ProfilePicture = ({ fallback, url }: TProfilePicture) => {
  return (
    <Avatar.Root className="flex h-10 w-10 select-none items-center overflow-hidden rounded-lg align-middle">
      <Avatar.Image
        className="h-full w-full object-cover shadow-md"
        src={url}
        alt={`user profile picture`}
      />
      <Avatar.Fallback
        delayMs={600}
      >
        <Avvvatars radius={5} value={fallback} />
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default ProfilePicture;
