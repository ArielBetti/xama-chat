"use client";

import dynamic from "next/dynamic";
import { EditorProps } from "react-draft-wysiwyg";

const Editor = dynamic<EditorProps>(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

import React, { memo, useState } from "react";
import { ContentState, convertToRaw } from "draft-js";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { TTextEditorProps } from "./types";

const TextEditor = ({
  editorState,
  setEditorState,
  disabledEditor,
}: TTextEditorProps) => {
  const _contentState = ContentState.createFromText("");
  const raw = convertToRaw(_contentState); // RawDraftContentState JSON
  const [contentState, setContentState] = useState(raw); // ContentState JSON

  return (
    <div className="w-full h-full">
      <Editor
        readOnly={disabledEditor}
        placeholder="Digite sua mensagem"
        wrapperClassName="w-full h-full max-h-[300px]"
        toolbarHidden
        editorState={editorState}
        onEditorStateChange={setEditorState}
        defaultContentState={contentState}
        onContentStateChange={setContentState}
      />
    </div>
  );
};

export default memo(TextEditor);
