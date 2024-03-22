"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: Readonly<DataTableProps<TData, TValue>>) {
  const { t } = useTranslation();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <h1 className="mb-4 text-lg font-medium text-slate-900 dark:text-slate-200">
        {t("usersList")}
      </h1>
      <div className="mb-4 flex flex-row space-x-2">
        <Button className="h-9 border-2 border-amber-500/50 bg-amber-500/10 px-3 text-amber-500 hover:bg-amber-500/20 hover:text-amber-500 dark:hover:text-amber-100 ">
          <LockKeyhole className="mr-2 h-4 w-4" />
          {t("block")}
        </Button>
        <Button className="h-9 border-2 border-teal-500/50 bg-teal-500/10 px-3 text-teal-500 hover:bg-teal-500/20 hover:text-teal-500 dark:hover:text-teal-100 ">
          <LockKeyholeOpen className="mr-2 h-4 w-4" />
          {t("unBlock")}
        </Button>
        <Button className="h-9 border-2 border-rose-500/50 bg-rose-500/10 px-3 text-rose-500 hover:bg-rose-500/20 hover:text-rose-500 dark:hover:text-rose-100 ">
          <Trash2 className="mr-2 h-4 w-4" />
          {t("delete")}
        </Button>
      </div>
      <div className="rounded border-2 backdrop-blur backdrop-filter">
        <Table>
          <TableHeader className="bg-muted/50 dark:bg-slate-800/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="group
                  cursor-pointer dark:text-slate-400
                  dark:even:bg-slate-800/20 dark:hover:bg-slate-800/50 dark:hover:text-slate-100 data-[state=selected]:dark:bg-slate-800/50 data-[state=selected]:dark:text-slate-100"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
