import prisma from "@/lib/prisma";
import { ItemColumns } from "./item-columns";
import { ItemDataTable } from "./item-data-table";

async function getItems(): Promise<Item[]> {
  const items = await prisma.item.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      Tags: true,
      ItemLike: true,
      ItemComments: true,
      collection: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  items.sort((a: any, b: any) => {
    return (
      new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
  });

  return items;
}

export default async function ItemTable() {
  const items = await getItems();
  return (
    <div>{items && <ItemDataTable columns={ItemColumns} data={items} />}</div>
  );
}
