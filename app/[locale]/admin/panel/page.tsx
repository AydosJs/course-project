import { getServerSession } from "next-auth";
import UserTable from "./user-table/UserTable";
import CollectionTable from "./collection-table/CollectionTable";

export default async function page() {
  const session = await getServerSession();
  if (!session) return;
  if (session && session.user.isAdmin === false) return;

  return (
    <div className="container mt-10 max-w-7xl">
      <div className="mb-20 flex flex-col space-y-8">
        <UserTable />
        <CollectionTable />
      </div>
    </div>
  );
}
