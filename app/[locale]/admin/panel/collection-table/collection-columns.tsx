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
import { MoreHorizontal, Pencil, Plus, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useRouter } from "next/navigation";
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
import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import toast from "react-hot-toast";

export const CollectionColumns: ColumnDef<Collection>[] = [
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
    accessorKey: "cover",
    header: "Cover",
    cell: ({ row }) => {
      return (
        <div className="mr-1 flex h-full items-center">
          <span
            style={{
              backgroundImage: `url(${row.original.cover})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="flex h-10 w-14 items-center justify-center rounded bg-slate-200 dark:bg-slate-700"
          >
            {!row.original.cover && "?"}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "name_description",
    header: () => {
      return <span className="truncate">Collection Name</span>;
    },

    cell: ({ row }) => {
      const sanitizedDescription = DOMPurify.sanitize(
        JSON.parse(row.original.description ?? '""'),
      );
      return (
        <div className="flex flex-col space-y-1">
          <span className="truncate font-medium dark:text-slate-300">
            {row.original.name}
          </span>
          <div
            className="line-clamp-1 h-4 text-slate-500 [&>*]:text-sm [&>*]:font-normal [&_strong]:font-normal"
            dangerouslySetInnerHTML={{
              __html: sanitizedDescription,
            }}
          ></div>
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: "Owner",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col space-y-1">
          {row.original.user && (
            <>
              <span>{row.original.user.name}</span>
              <span>{row.original.user.email}</span>
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "topic",
    header: "Topic",
    cell: ({ row }) => {
      return <span className="truncate">{row?.original?.topic}</span>;
    },
  },
  {
    accessorKey: "items",
    header: () => {
      return <div className="truncate">Items</div>;
    },

    cell: ({ row }) => {
      return <>{row.original.Item && `${row.original.Item.length}`}</>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      return (
        <div className="truncate">
          {dayjs(row.original.publishedAt).format("DD MMM YYYY")}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({
      row,
      table,
    }: {
      row: Row<Collection>;
      table: Table<Collection>;
    }) => {
      return <Actions row={row} table={table} />;
    },
  },
];

function Actions({
  row,
  table,
}: Readonly<{ row: Row<Collection>; table: Table<Collection> }>) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const selectedCollectionsId: string[] = [];

  if (table.getSelectedRowModel().rows.length > 0) {
    table
      .getSelectedRowModel()
      .rows.map((row) => selectedCollectionsId.push(row.original.id));
  } else {
    selectedCollectionsId.push(row.original.id);
  }

  const handleDelete = async () => {
    if (selectedCollectionsId.length === 0 && loading) return;
    try {
      setLoading(true);
      const res = await fetch("/api/collection/delete/many", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: selectedCollectionsId }),
      });

      if (res.ok && res.status === 200) {
        table.toggleAllRowsSelected(false);
        router.refresh();
        toast.success("Collection deleted!");
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
              <Link href={`/collection/${row.original.id}/create/item`}>
                <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2">
                  <Plus className="mr-3 size-4" />
                  {t("create_item")}
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
            </>
          )}
          {table.getSelectedRowModel().rows.length <= 1 && (
            <Link href={`/collection/${row.original.id}/edit`}>
              <DropdownMenuItem className="flex cursor-pointer flex-row items-center rounded-none p-2">
                <Pencil className="mr-3 size-4" />
                {t("edit")}
              </DropdownMenuItem>
            </Link>
          )}
          <DropdownMenuItem
            onClick={() => {
              setIsDeleteDialogOpen(true);
            }}
            className="flex cursor-pointer flex-row items-center rounded-none p-2"
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
