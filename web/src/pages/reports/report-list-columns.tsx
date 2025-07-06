import { Badge } from "@/components/ui/badge";
import type { Report } from "@/schema/report";
import type { ColumnDef } from "@tanstack/react-table";

  export const ReportListColumns: ColumnDef<Report>[] = [
    {
      accessorKey: "details.type",
      header: "Type",
      cell: info => <Badge>{info.getValue<string>()}</Badge>,
      enableGlobalFilter: true
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: info => info.getValue(),
      enableGlobalFilter: true
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: info => `${new Date(info.getValue<string>()).toLocaleDateString()}`,
    },
    {
      accessorKey: "user",
      header: "User",
      cell: info => info.getValue(),
      enableGlobalFilter: true
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: info => `${info.getValue()} / 10`,
    },
  ]
