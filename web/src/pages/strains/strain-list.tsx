// src/pages/strains/strain-list.tsx
import { DataTable } from "@/components/data-table"
import PageLayout from "@/components/page-layout"
import type { Strain } from "@/schema/strain"
import { getStrainsAsync } from "@/services/dataService"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { StrainListColumns } from "./strain-list-columns"

const StrainList = () => {
  const [strains, setStrains] = useState<Strain[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    getStrainsAsync()
      .then(setStrains)
      .catch(err => setError(err.message))
  }, [])
  const navigate = useNavigate()

  if (error) return <div>Error: {error}</div>
  if (strains.length === 0) return <div className="p-6 w-full">Load Strains...</div>

  return (
    <PageLayout title="Strains">
    <div className="w-full">
      <div className="overflow-hidden ">
        <DataTable columns={StrainListColumns} data={strains} onRowClick={(row) => navigate(`/strains/${row.id}`)} />
      </div>
    </div>
    </PageLayout>
  )
}

export default StrainList
