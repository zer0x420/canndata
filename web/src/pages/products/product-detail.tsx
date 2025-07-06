// src/pages/strains/strain-details.tsx
import DetailPageLayout from "@/components/detail-page-layout"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { DataTable } from "@/components/data-table"
import StatsGrid from "@/components/stats-grid"
import { getProductsByIdAsync, getReportsByProductIdAsync, getStrainByIdAsync } from "@/services/dataService"
import type { Product } from "@/schema/product"
import type { Report } from "@/schema/report"
import type { Strain } from "@/schema/strain"
import { ReportListColumns } from "../reports/report-list-columns"
import { getProductDetailStats, getProductDetailTags, getProductStrainDetailStats } from "./product-detail-stats"


const ProductDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | undefined>(undefined)
  const [productStrain, setProductStrain] = useState<Strain | undefined>(undefined)
  const [productReports, setProductReports] = useState<Report[]>([])
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    getProductsByIdAsync(id)
      .then((data) => {
        setProduct(data);
        if(data?.strain_id) {
          getStrainByIdAsync(data?.strain_id)
          .then(setProductStrain)
          .catch(err => setError(err.message))
        }
      })
      .catch(err => setError(err.message))


    getReportsByProductIdAsync(id)
      .then(setProductReports)
      .catch(err => setError(err.message))

  }, [id])

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>
  if (!product) return <div className="p-6 w-full">Load Product...</div>

  return (
    <DetailPageLayout title={product?.name ?? "-"} tags={getProductDetailTags(product)}>
      <StatsGrid stats={{...getProductDetailStats(product), ...getProductStrainDetailStats(productStrain)}} />

      <h2 className="text-2xl font-semibold mt-8 mb-4">Reports</h2>
      {productReports && productReports.length > 0 ? (
        <DataTable columns={ReportListColumns} data={productReports} onRowClick={(row) => navigate(`/reports/${row.id}`)} />
      ) : (
        <p className="text-muted-foreground">No Reports found.</p>
      )}
    </DetailPageLayout>
  )
}

export default ProductDetail
