import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState
} from "@tanstack/react-table"
import { useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "./ui/pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
}

export function DataTable<TData, TValue>({ columns, data, onRowClick }: DataTableProps<TData, TValue>) {
const [sorting, setSorting] = useState<SortingState>([])
const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(), // <- wichtig!
    globalFilterFn: "includesString", // oder dein Custom-Filter
  })

  return (
    <div className="rounded-md border">
      <div className="flex items-center justify-between p-2">
        <div></div>
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="border rounded px-3 py-1 w-full max-w-xs"
        />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " ↑" : header.column.getIsSorted() === "desc" ? " ↓" : ""}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              className={onRowClick ? "cursor-pointer hover:bg-muted" : ""}
              onClick={() => onRowClick?.(row.original)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={!table.getCanPreviousPage() ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
            <PaginationItem>
              <span className="text-sm px-2 py-1 rounded border">
                Seite {table.getState().pagination.pageIndex + 1} von {table.getPageCount()}
              </span>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={!table.getCanNextPage() ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

    </div>
  )
}
