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

export type Payment = {
  id: string;
  avatar: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  itemCount: number;
};

export const columns: ColumnDef<Payment>[] = [
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
          <AvatarImage className="" src={row.original.avatar} />
          <AvatarFallback className="text-xs">CN</AvatarFallback>
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="">
          {dayjs(row.original.createdAt).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({}) => {
      return (
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
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20 hover:dark:text-amber-500">
              <LockKeyhole className="mr-3 size-4" />
              Block
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2  dark:hover:bg-slate-500/20 hover:dark:text-teal-500">
              <LockKeyholeOpen className="mr-3 size-4" />
              UnBlock
            </DropdownMenuItem>
            <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20 hover:dark:text-rose-500">
              <Trash2 className="mr-3 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
