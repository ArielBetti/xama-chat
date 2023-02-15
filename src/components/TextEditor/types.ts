import { Dispatch, SetStateAction } from "react";
import { EditorState } from "react-draft-wysiwyg";

export type TTextEditorProps = {
  editorState: EditorState;
  setEditorState: Dispatch<SetStateAction<EditorState>>;
};
