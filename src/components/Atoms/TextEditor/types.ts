import { Dispatch, SetStateAction } from "react";
import { EditorState } from "react-draft-wysiwyg";

export type TTextEditorProps = {
  editorState: EditorState;
  disabledEditor: boolean,
  setEditorState: Dispatch<SetStateAction<EditorState>>;
};
