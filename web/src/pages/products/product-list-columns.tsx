import { Badge } from "@/components/ui/badge";
import type { Product } from "@/schema/product";
import type { ColumnDef } from "@tanstack/react-table";

  export const ProductListColumns: ColumnDef<Product>[] = [
    {
      accessorKey: "details.type",
      header: "Type",
      cell: info => <Badge>{info.getValue<string>()}</Badge>
    },
    {
      accessorKey: "details",
      header: "Vendor",
      cell: info => {
        const data = info.getValue<any>() ?? {};
        let value = "-";
        if(data.type == "Medical"){
          value = data.vendor;
        }else if(data.type == "Recreational"){
          value = data.breeder;
        }
        return value
      }
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: info => info.getValue(),
      enableGlobalFilter: true
    },
  ]
