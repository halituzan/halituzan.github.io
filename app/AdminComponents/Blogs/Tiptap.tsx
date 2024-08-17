"use client";
import { TagProps } from "@/app/Configs/types";
import Network from "@/utils/Network";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Fragment, useCallback, useEffect, useState } from "react";
import "./styles.scss";

export default ({ setOpen }: any) => {
  const [hideContent, setHideContent] = useState(false);
  const [openTagList, setOpenTagList] = useState(false);
  const [tagList, setTagList] = useState<any>([]);

  const [values, setValues] = useState<any>({
    title: "",
    content: "",
    summary: "",
    tags: [],
  });
  console.log(values);

  const { title, content, summary, tags } = values;

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
      Youtube.configure({
        controls: false,
        nocookie: true,
      }),
    ],
    content: "",

    editorProps: {
      attributes: {
        spellcheck: "false",
        class: "min-h-[500px] bg-slate-100 border p-2 rounded",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      setValues({ ...values, content: html });
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

  const getTags = async () => {
    try {
      const res = await Network.run(null, "GET", "/tags", null);
      setTagList(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const createPost = async () => {
    try {
      const res = await Network.run(null, "POST", "/blogs/create", values);
      console.log("res", res);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTags();
  }, []);
  return (
    <Fragment>
      <div
        className={`${hideContent ? "overflow-y-hidden" : "overflow-y-hidden"}`}
      >
        <div className='w-full my-2 z-50 block'>
          <input
            type='text'
            id='title'
            value={title}
            onChange={(e) => setValues({ ...values, title: e.target.value })}
            placeholder='Başlık'
            className='p-2 border rounded-sm w-full'
          />
        </div>
        <div
          className={`transition-transform duration-500 ease-in-out ${
            hideContent
              ? "transform -translate-y-full opacity-0 h-0"
              : "transform -translate-y-0 opacity-100 h-full"
          }`}
        >
          <MenuBar editor={editor} setLink={setLink} />

          <EditorContent editor={editor} />
          <div className='w-full my-2 mt-4 relative'>
            <textarea
              id='summary'
              className='p-2 border rounded-sm w-full'
              placeholder='Özet'
              value={summary}
              onChange={(e) =>
                setValues({ ...values, summary: e.target.value })
              }
            ></textarea>
            <div className='absolute -top-2 border border-y-0 right-4 bg-white px-2'>
              {values.summary.length} / 140
            </div>
          </div>
          <div
            className='w-full my-2 relative z-50'
            onMouseLeave={() => setOpenTagList(false)}
          >
            <div
              id='tags'
              onClick={() => setOpenTagList(true)}
              className='p-2 border rounded-sm w-full h-11 flex items-center'
            >
              {tags.length > 0 ? (
                tags.map((i: TagProps) => {
                  return (
                    <div
                      key={i._id}
                      className='mx-1 p-1 border rounded bg-slate-500 text-white flex items-center'
                    >
                      {i.name}
                      <Icon
                        icon={"oi:delete"}
                        className='ml-1 cursor-pointer'
                        onClick={() => {
                          setTagList((prev: TagProps[]) => [
                            ...prev,
                            { _id: i._id, name: i.name, url: i.url },
                          ]);
                          setValues({
                            ...values,
                            tags: values.tags.filter(
                              (item: TagProps) => item._id !== i._id
                            ),
                          });
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <span className='text-gray-400 select-none'>
                  type some ticket react, nextjs, javascript etc.
                </span>
              )}
            </div>
            {openTagList && (
              <div className='absolute overflow-y-auto bottom-10 z-50 w-3/4 rounded flex flex-col max-h-[200px] bg-white shadow-md border'>
                {tagList.map((i: TagProps) => (
                  <span
                    className='p-2 z-50 cursor-pointer hover:bg-slate-300'
                    onClick={() => {
                      setValues({
                        ...values,
                        tags: [
                          ...tags,
                          { _id: i._id, name: i.name, url: i.url },
                        ],
                      });
                      setTagList(
                        tagList.filter((item: TagProps) => item._id !== i._id)
                      );
                    }}
                  >
                    {i.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='w-full my-2 flex justify-end items-center'>
            <button
              className='p-2 bg-slate-500 rounded text-white mr-2'
              onClick={() => setOpen(false)}
            >
              İptal
            </button>
            <button
              className='p-2 bg-blue-600 rounded text-white'
              onClick={createPost}
            >
              Kaydet
            </button>
          </div>
        </div>
        {/* <div className='mt-2 flex justify-center items-center z-0 py-2 w-full'>
          <Icon
            icon={
              hideContent ? "ri:arrow-down-wide-fill" : "ri:arrow-up-wide-fill"
            }
            fontSize={64}
            onClick={() => setHideContent(!hideContent)}
            className='cursor-pointer z-0 text-slate-500 hover:text-slate-900 animate-bounce'
          />
        </div> */}
      </div>
    </Fragment>
  );
};

const MenuBar = ({ editor, setLink }: any) => {
  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    const url = prompt("Enter YouTube URL");

    if (url) {
      editor.commands?.setYoutubeVideo({
        src: url,
        width: Math.max(320, parseInt("640", 10)) || 640,
        height: Math.max(180, parseInt("480", 10)) || 480,
      });
    }
  };

  return (
    <div className='control-group bg-slate-50 mb-2 relative sticky z-40 top-80'>
      <div className='button-group flex items-center '>
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
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          Strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          Code
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          H6
        </button>
        <button
          onClick={setLink}
          className={editor.isActive("link") ? "is-active" : ""}
        >
          Link
        </button>
        <button id='add' onClick={addYoutubeVideo}>
          Add YouTube video
        </button>

        {/*
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          Clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive("paragraph") ? "is-active" : ""}
        >
          Paragraph
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : "is-active"}
        >
          Bullet list
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          list
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          Blockquote
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          Horizontal rule
        </button> */}
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          Hard break
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
