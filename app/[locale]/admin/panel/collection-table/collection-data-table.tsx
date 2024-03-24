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
import { useTranslation } from "react-i18next";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<Collection, TValue>[];
  data: Collection[];
}

export function CollectionDataTable<TData, TValue>({
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
        {t("collection_list")}
      </h1>
      <div className="rounded border backdrop-blur backdrop-filter dark:border-2">
        <Table>
          <TableHeader className="bg-muted/50 dark:bg-slate-800/60">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      className="text-slate-800 dark:text-slate-200"
                      key={header.id}
                    >
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
                  className={`
                  data-[state=selected]:dark:text-slate-100} group cursor-pointer text-slate-600 hover:text-slate-800
                  data-[state=selected]:text-slate-800 dark:text-slate-400 dark:even:bg-slate-800/20 dark:hover:bg-slate-800/50 dark:hover:text-slate-100 data-[state=selected]:dark:bg-slate-800/50
                  `}
                  key={row.id}
                  onClick={row.getToggleSelectedHandler()}
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
