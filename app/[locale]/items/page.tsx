import prisma from "@/lib/prisma";
import ItemsPage from "./ItemsPage";

async function getAllTags(): Promise<Tags[]> {
  const tags = await prisma.tags.findMany();
  return tags || [];
}
export default async function page() {
  const allTags = await getAllTags();

  return (
    <div>
      <ItemsPage tags={allTags} />
    </div>
  );
}
