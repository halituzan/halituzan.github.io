"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment, useCallback } from "react";
import "./styles.scss";

export default ({ description, changeHandler }: any) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
    ],
    content: description,

    editorProps: {
      attributes: {
        spellcheck: "false",
        class: "min-h-[500px] bg-slate-100 border p-2 rounded",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      changeHandler("description", html);
    },
  });

  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);
    console.log("2");
    if (url === null) {
      return;
    }
    console.log("2");

    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  return (
    <Fragment>
      <div className={`overflow-y-hidden`}>
        <div
          className={`transition-transform duration-500 ease-in-out ${"transform -translate-y-0 opacity-100 h-full"}`}
        >
          <MenuBar editor={editor} setLink={setLink} />
          <EditorContent editor={editor} />
        </div>
      </div>
    </Fragment>
  );
};

const MenuBar = ({ editor, setLink }: any) => {
  if (!editor) {
    return null;
  }

  return (
    <div className='control-group bg-slate-50 mb-2'>
      <div className='button-group flex items-center'>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          Italic
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          Link
        </button>

        <button onClick={() => editor.chain().focus().undo().run()}>
          <Icon icon={"ri:reply-line"} fontSize={20} />
        </button>
        <button
          className='content-end'
          onClick={() => editor.chain().focus().redo().run()}
        >
          <Icon icon={"ri:share-forward-line"} fontSize={20} />
        </button>
      </div>
    </div>
  );
};
