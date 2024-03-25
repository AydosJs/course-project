"use client";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toggle } from "@/components/ui/toggle";
import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Paragraph from "@tiptap/extension-paragraph";

const extensions = [
  TextStyle.configure({ types: [ListItem.name] } as any),
  StarterKit.configure({}),
  BulletList.configure({
    HTMLAttributes: {
      class: "list-disc pl-4",
    },
  }),
  OrderedList.configure({
    HTMLAttributes: {
      class: "list-decimal pl-4",
    },
  }),
  Heading.configure({
    HTMLAttributes: {
      class: "text-xl font-bold",
      levels: 2,
    },
  }),
  Paragraph.configure({
    HTMLAttributes: {
      class: "block min-h-[2rem]",
    },
  }),
];

const Tiptap = ({
  description,
  onChange,
}: {
  description?: string;
  onChange: (richText: string) => void;
}) => {
  return (
    <div className="w-full rounded border-2 bg-slate-100 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:placeholder:text-slate-500 ">
      <EditorProvider
        editorProps={{
          attributes: {
            class: "p-3 outline-none min-h-32",
          },
        }}
        content={description}
        onUpdate={({ editor }) => {
          onChange(editor.getHTML());
        }}
        slotBefore={<MenuBar />}
        extensions={extensions}
      >{` `}</EditorProvider>
    </div>
  );

  //  <EditorContent editor={editor} />;
};

export default Tiptap;

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="divide-x-2 border-b-2 dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800/50">
      <Toggle
        className="rounded-none"
        size={"sm"}
        pressed={editor.isActive("heading")}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="size-4" />
      </Toggle>
      <Toggle
        className="rounded-none"
        size={"sm"}
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-4" />
      </Toggle>
      <Toggle
        className="rounded-none"
        size={"sm"}
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-4" />
      </Toggle>
      <Toggle
        className="rounded-none"
        size={"sm"}
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-4" />
      </Toggle>

      <Toggle
        className="rounded-none"
        size={"sm"}
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-4" />
      </Toggle>

      <Toggle
        className="rounded-none"
        size={"sm"}
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-4" />
      </Toggle>
    </div>
  );
};
