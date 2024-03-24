"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LockKeyhole,
  LockKeyholeOpen,
  MoreHorizontal,
  Plus,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { Badge } from "@/components/ui/badge";

function UserActions({ userId }: Readonly<{ userId: string }>) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleBlock = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/updateStatus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, status: "blocked" }),
      });

      if (res.ok && res.status === 200) {
        router.refresh();
        toast.success("User Blocked!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnblock = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/user/updateStatus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId, status: "active" }),
      });

      if (res.ok && res.status === 200) {
        router.refresh();
        toast.success("User Unblocked!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed left-0 top-0 z-40 w-full">
          <div className="h-1 w-full overflow-hidden bg-sky-200 dark:bg-sky-100/10">
            <div className="h-full w-full origin-left-right animate-progress rounded-full bg-sky-500"></div>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-6 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded border-2 border-slate-900/10 bg-slate-50 p-0 text-slate-600 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-800/30  dark:text-slate-400"
        >
          <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20">
            <Plus className="mr-3 size-4" />
            Collection Create
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20">
            <Plus className="mr-3 size-4" />
            Item Create
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleBlock}
            className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20 hover:dark:text-amber-500"
          >
            <LockKeyhole className="mr-3 size-4" />
            Block
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleUnblock}
            className="flex cursor-pointer flex-row items-center rounded-none p-2  dark:hover:bg-slate-500/20 hover:dark:text-teal-500"
          >
            <LockKeyholeOpen className="mr-3 size-4" />
            UnBlock
          </DropdownMenuItem>
          <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20 hover:dark:text-rose-500">
            <Trash2 className="mr-3 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="dark:border-slate-500"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="dark:border-slate-500 group-hover:dark:border-slate-100"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      return (
        <Avatar className="size-8">
          <AvatarImage className="" src={row.original.image as string} />
          <AvatarFallback className="bg-sky-500 text-sky-50">
            {row.original.name ? row.original.name.charAt(0) : "?"}
          </AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "itemCount",
    header: "Item Count",

    cell: ({ row }) => {
      return <>{row.original.Item && `${row.original.Item.length}`}</>;
    },
  },
  {
    accessorKey: "isAdmin",
    header: "Is Admin",
    cell: ({ row }) => {
      return (
        <span className={`${row.original.isAdmin && "text-sky-500"}`}>
          {row.original.isAdmin ? "* true" : "false"}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <Badge
          className={`font-normal ${row.original.status === "blocked" ? "border-2 border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/10" : "border-2 border-sky-500/30 bg-sky-500/10 text-sky-500 hover:bg-sky-500/10"}`}
        >
          {row.original.status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="truncate">
          {dayjs(row.original.createdAt).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <UserActions userId={row.original.id} />;
    },
  },
];
