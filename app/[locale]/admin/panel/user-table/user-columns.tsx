"use client";

import { ColumnDef, Row, Table } from "@tanstack/react-table";
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
  ShieldBan,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useTranslation } from "react-i18next";
import Link from "next/link";

export const userColumns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex h-full items-center">
        <Checkbox
          className="border-2 border-slate-500 dark:border-slate-500"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="rounded border-2 border-slate-500 dark:border-slate-500 group-hover:dark:border-slate-100"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <div className="flex flex-row items-center">
          <Avatar className="mr-3 size-8 border-2">
            <AvatarImage className="" src={row.original.image as string} />
            <AvatarFallback className="bg-sky-500/30 font-semibold text-sky-500">
              {row.original.name ? row.original.name.charAt(0) : "?"}
            </AvatarFallback>
          </Avatar>
          <span>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "item",
    header: "Items",

    cell: ({ row }) => {
      return <>{row.original.Item && `${row.original.Item.length}`}</>;
    },
  },
  {
    accessorKey: "isAdmin",
    header: "Role",
    cell: ({ row }) => {
      return (
        <span className={`${row.original.isAdmin && "text-sky-500"}`}>
          {row.original.isAdmin ? "Admin" : "User"}
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
    cell: ({ row, table }: { row: Row<User>; table: Table<User> }) => {
      return <UserActions row={row} table={table} />;
    },
  },
];

function UserActions({
  row,
  table,
}: Readonly<{ row: Row<User>; table: Table<User> }>) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const selectedUsersId: string[] = [];

  if (table.getSelectedRowModel().rows.length > 0) {
    table
      .getSelectedRowModel()
      .rows.map((row) => selectedUsersId.push(row.original.id));
  } else {
    selectedUsersId.push(row.original.id);
  }

  const handleStatusUpdate = async (status: "active" | "blocked") => {
    if (selectedUsersId.length === 0 && loading) return;
    try {
      setLoading(true);
      const res = await fetch("/api/user/updateStatus", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedUsersId, status: status }),
      });
      if (res.ok && res.status === 200) {
        table.toggleAllRowsSelected(false);
        router.refresh();
        toast.success(
          `Sussessfully ${status === "active" ? "unblocked" : "blocked"}!`,
        );
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleUpdate = async (isAdmin: boolean) => {
    if (selectedUsersId.length === 0 && loading) return;
    try {
      setLoading(true);
      const res = await fetch("/api/user/setAdmin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedUsersId, isAdmin }),
      });
      if (res.ok && res.status === 200) {
        table.toggleAllRowsSelected(false);
        router.refresh();
        toast.success(`Sussessfully updated!`);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (selectedUsersId.length === 0 && loading) return;
    try {
      setLoading(true);
      const res = await fetch("/api/user/delete", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedUsersId }),
      });

      if (res.ok && res.status === 200) {
        table.toggleAllRowsSelected(false);
        router.refresh();
        toast.success("User deleted!");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const { t } = useTranslation();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isBlockDialogOpen, setIsBlockDialogOpen] = useState(false);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);

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
          <Button
            disabled={
              Boolean(table.getSelectedRowModel().rows.length !== 0) &&
              !table
                .getSelectedRowModel()
                .rows.some((selectedRow) => row.id === selectedRow.id)
            }
            variant="ghost"
            className={`size-6 p-0 disabled:opacity-0`}
          >
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="rounded border-2 border-slate-900/10 bg-slate-50 p-0 text-slate-600 backdrop-blur dark:border-slate-50/[0.06] dark:bg-slate-800/30  dark:text-slate-400"
        >
          {table.getSelectedRowModel().rows.length <= 1 && (
            <>
              <Link href={`/collection/create?ownerId=${row.original.id}`}>
                <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20">
                  <Plus className="mr-3 size-4" />
                  {t("create_collection")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem
            onClick={() => setIsAdminDialogOpen(true)}
            className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20"
          >
            <ShieldCheck className="mr-3 size-4" />
            {t("set_Admin")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleRoleUpdate(false)}
            className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20"
          >
            <ShieldBan className="mr-3 size-4" />
            {t("remove_Admin")}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              setIsBlockDialogOpen(true);
            }}
            className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20 hover:dark:text-amber-500"
          >
            <LockKeyhole className="mr-3 size-4" />
            {t("block")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleStatusUpdate("active")}
            className="flex cursor-pointer flex-row items-center rounded-none p-2  dark:hover:bg-slate-500/20 hover:dark:text-teal-500"
          >
            <LockKeyholeOpen className="mr-3 size-4" />
            {t("activate")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteDialogOpen(true);
            }}
            className="flex cursor-pointer flex-row items-center rounded-none p-2 dark:hover:bg-slate-500/20 hover:dark:text-rose-500"
          >
            <Trash2 className="mr-3 size-4" />
            {t("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ReusableAlertDialog
        open={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        actionHandler={handleDelete}
      />

      <ReusableAlertDialog
        open={isBlockDialogOpen}
        setIsOpen={setIsBlockDialogOpen}
        actionHandler={() => handleStatusUpdate("blocked")}
      />

      <ReusableAlertDialog
        open={isAdminDialogOpen}
        setIsOpen={setIsAdminDialogOpen}
        actionHandler={() => handleRoleUpdate(true)}
      />
    </>
  );
}

const ReusableAlertDialog = ({
  open,
  setIsOpen,
  actionHandler,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  actionHandler: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("confirmation_required")}</AlertDialogTitle>
          <AlertDialogDescription>{t("cannot_undone")}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            className="border-2 dark:bg-transparent dark:hover:bg-slate-700"
          >
            {t("cancel")}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setIsOpen(false);
              actionHandler();
            }}
          >
            {t("continue")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
