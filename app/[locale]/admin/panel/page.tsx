import { getServerSession } from "next-auth";
import { DataTable } from "./data-table";
import { columns, Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "John Doe",
      itemCount: 17,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGBE9aNFU6PUI-BPzQTbAO1OtcBnUTPL7zIA&usqp=CAU",
      email: "m@example.com",
      isAdmin: false,
      createdAt: new Date(),
    },
    {
      id: "92a1b34c",
      name: "Alice Smith",
      itemCount: 240,
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      email: "alice@example.com",
      isAdmin: true,
      createdAt: new Date(),
    },
    {
      id: "c7f9e2a5",
      name: "Bob Johnson",
      itemCount: 1302,
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      email: "bob@example.com",
      isAdmin: false,
      createdAt: new Date(),
    },
    {
      id: "5d8c36e7",
      name: "Emily Brown",
      itemCount: 20,
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      email: "emily@example.com",
      isAdmin: false,
      createdAt: new Date(),
    },
    {
      id: "f0bea921",
      name: "David Wilson",
      itemCount: 401,
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      email: "david@example.com",
      isAdmin: false,
      createdAt: new Date(),
    },
    {
      id: "1a2b3c4d",
      name: "Sophia Lee",
      itemCount: 98,
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      email: "sophia@example.com",
      isAdmin: false,
      createdAt: new Date(),
    },
  ];
}

export default async function page() {
  const session = await getServerSession();
  if (!session) return;
  if (session && session.user.isAdmin === false) return;

  const data = await getData();

  return (
    <div className="container mt-10 max-w-7xl">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
