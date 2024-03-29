import prisma from "@/lib/prisma";
import CollectionsPage from "./CollectionsPage";

async function getAllTags(): Promise<Tags[]> {
  const tags = await prisma.tags.findMany();
  return tags || [];
}
export default async function page() {
  const allTags = await getAllTags();

  return (
    <div>
      <CollectionsPage tags={allTags} />
    </div>
  );
}
