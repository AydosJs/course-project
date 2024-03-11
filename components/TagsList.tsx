import prisma from "@/lib/prisma";

async function getTags(): Promise<Tags[]> {
  const tags = await prisma.tags.findMany();

  return tags || [];
}
export default async function TagsList() {
  const tags = await getTags();
  return (
    <div className="flex flex-wrap gap-2">
      {tags.length !== 0 &&
        tags.map((tag) => (
          <div
            key={tag.id}
            className="w-fit cursor-pointer rounded-full border-2 bg-slate-50 p-3 px-5 text-sky-500 hover:border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/50 dark:hover:border-slate-700 dark:hover:bg-slate-800"
          >
            #{tag.text}
          </div>
        ))}
      {tags.length === 0 && <div>No tags yet!</div>}
    </div>
  );
}
