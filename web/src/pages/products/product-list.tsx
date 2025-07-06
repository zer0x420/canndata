// src/pages/strains/products-list.tsx
import { DataTable } from "@/components/data-table"
import PageLayout from "@/components/page-layout"
import type { Product } from "@/schema/product"
import { getProductsAsync } from "@/services/dataService"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductListColumns } from "./product-list-columns"

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    getProductsAsync()
      .then(setProducts)
      .catch(err => setError(err.message))
  }, [])
  const navigate = useNavigate()

  if (error) return <div>Error: {error}</div>
  if (products.length === 0) return <div className="p-6 w-full">Load Products...</div>

  return (
    <PageLayout title="Products">
    <div className="w-full">
      <div className="overflow-hidden ">
        <DataTable columns={ProductListColumns} data={products} onRowClick={(row) => navigate(`/products/${row.id}`)} />
      </div>
    </div>
    </PageLayout>
  )
}

export default ProductList
