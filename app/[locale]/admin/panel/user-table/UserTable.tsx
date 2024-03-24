import prisma from "@/lib/prisma";
import { UserDataTable } from "./user-data-table";
import { userColumns } from "./user-columns";

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

export default async function UserTable() {
  const data = await getUsers();

  return (
    <div>{data && <UserDataTable columns={userColumns} data={data} />}</div>
  );
}
