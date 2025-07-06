// src/pages/strains/products-list.tsx
import { DataTable } from "@/components/data-table"
import PageLayout from "@/components/page-layout"
import type { Report } from "@/schema/report";
import { getReportsAsync } from "@/services/dataService"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ReportListColumns } from "./report-list-columns"

const ReportList = () => {
  const [reports, setReports] = useState<Report[]>([])
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    getReportsAsync()
      .then(setReports)
      .catch(err => setError(err.message))
  }, [])
  const navigate = useNavigate()

  if (error) return <div>Error: {error}</div>
  if (reports.length === 0) return <div className="p-6 w-full">Load Reports...</div>

  return (
    <PageLayout title="Reports">
    <div className="w-full">
      <div className="overflow-hidden ">
        <DataTable columns={ReportListColumns} data={reports} onRowClick={(row) => navigate(`/reports/${row.id}`)} />
      </div>
    </div>
    </PageLayout>
  )
}

export default ReportList
