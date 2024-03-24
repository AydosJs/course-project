import { getServerSession } from "next-auth";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import prisma from "@/lib/prisma";

async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    include: {
      Item: true,
    },
  });

  users.sort((a: any, b: any) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return users;
}

export default async function page() {
  const session = await getServerSession();
  if (!session) return;
  if (session && session.user.isAdmin === false) return;

  const data = await getUsers();

  return (
    <div className="container mt-10 max-w-7xl">
      {data && <DataTable columns={columns} data={data} />}
    </div>
  );
}
