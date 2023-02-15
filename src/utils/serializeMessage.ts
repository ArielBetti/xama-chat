import { convertToRaw, EditorState } from "draft-js";

export const SerializeMessage = (message: EditorState) => {
  const raw = convertToRaw(message.getCurrentContent())
  .blocks.map((messageBlock) => String(messageBlock.text))
  .join("\n");

  return raw;
}
