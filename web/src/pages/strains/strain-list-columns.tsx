import { Badge } from "@/components/ui/badge";
import type { Strain } from "@/schema/strain";
import type { ColumnDef } from "@tanstack/react-table";

export const StrainListColumns: ColumnDef<Strain>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: info => info.getValue(),
    enableGlobalFilter: true
  },
  {
    accessorKey: "genetics",
    header: "Genetics",
    cell: info => info.getValue(),
    enableGlobalFilter: true
  },
  {
    accessorKey: "thc",
    header: "THC",
    cell: info => {
      const value = info.getValue() as any;
      return `${value.min}%-${value.max}%`;
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "cbd",
    header: "CBD",
    cell: info => {
      const value = info.getValue() as any;
      return `${value.min}%-${value.max}%`;
    },
    enableGlobalFilter: true,
  },
  {
    accessorKey: "terpene",
    header: "Terpene",
    cell: info => {
      const values = info.getValue<string[]>()
      return values.length > 0 ? values.map((v) => <Badge key={v} className="mx-1">{v}</Badge>) : "-"
    }
  },
]
