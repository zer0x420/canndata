// src/pages/strains/strain-details.tsx
import DetailPageLayout from "@/components/detail-page-layout"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/data-table"
import StatsGrid from "@/components/stats-grid"
import ReactMarkdown from "react-markdown"
import type { Strain } from "@/schema/strain"
import { getProductsByStrainIdAsync, getStrainByIdAsync } from "@/services/dataService"
import type { Product } from "@/schema/product"
import { ProductListColumns } from "../products/product-list-columns"
import { getStrainDetailStats, getStrainDetailTags } from "./strain-detail-stats"


const StrainDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [strain, setStrain] = useState<Strain | undefined>(undefined)
  const [strainProducts, setStrainProducts] = useState<Product[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    getStrainByIdAsync(id)
      .then(setStrain)
      .catch(err => setError(err.message))

    getProductsByStrainIdAsync(id)
      .then(setStrainProducts)
      .catch(err => setError(err.message))

  }, [id])

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>
  if (!strain) return <div className="p-6 w-full">Load Strain...</div>

  return (
    <DetailPageLayout title={strain.name} tags={getStrainDetailTags(strain)}>
      <StatsGrid stats={getStrainDetailStats(strain)} />
      <div>
        <ReactMarkdown>{strain.description}</ReactMarkdown>
      </div>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Products</h2>
      {strainProducts && strainProducts.length > 0 ? (
        <DataTable columns={ProductListColumns} data={strainProducts} onRowClick={(row) => navigate(`/products/${row.id}`)} />
      ) : (
        <p className="text-muted-foreground">No Products found.</p>
      )}
    </DetailPageLayout>
  )
}

export default StrainDetail
