// src/pages/strains/strain-details.tsx
import DetailPageLayout from "@/components/detail-page-layout"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import StatsGrid from "@/components/stats-grid"
import { getProductsByIdAsync, getReportByIdAsync, getReportsImage } from "@/services/dataService"
import type { Report } from "@/schema/report"
import type { Product } from "@/schema/product"
import ReactMarkdown from "react-markdown"
import { Separator } from "@/components/ui/separator"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { getReportDetailStats, getReportDetailTags, getReportProductDetailStats } from "./report-detail-stats"


const ReportDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [report, setReport] = useState<Report | undefined>(undefined)
  const [reportProduct, setReportProduct] = useState<Product | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    getReportByIdAsync(id)
      .then((data) => {
        setReport(data);
        if (data?.product_id) {
          getProductsByIdAsync(data.product_id)
            .then(setReportProduct)
            .catch(err => setError(err.message))
        }
      })
      .catch(err => setError(err.message))

  }, [id])

  if (error) return <div className="p-6 text-red-600">Error: {error}</div>
  if (!report) return <div className="p-6 w-full">Load Report...</div>

  const hasImages = () => report.images && report.images.length > 0;
  
  const getCarousel = () => {
    return (
      <Carousel opts={{
        align: "start",
        loop: true,

      }}
        className="w-full max-w-sm" >
        <CarouselContent>
          {report.images && report.images.length > 0 ? report.images?.map((value, index) => (
            <CarouselItem key={index}>
              <div>
                <AspectRatio>
                  <img className="rounded-md object-cover" src={getReportsImage(report.id ?? '', value).toString()} />
                </AspectRatio>
              </div>
            </CarouselItem>
          )) : <CarouselItem><div className="text-center">No Images</div></CarouselItem>}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    )
  }

  return (
    <DetailPageLayout title={report?.title ?? "-"} tags={getReportDetailTags(report)}>
      <div>
        <div>
          <StatsGrid stats={{...getReportProductDetailStats(reportProduct), ...getReportDetailStats(report)}} />
        </div>
      </div>
      <Separator className="my-3" />
      <div className="flex flex-col md:flex-row gap-6 mt-6">
        {hasImages() ? 
        <div className={'w-full md:w-1/2 flex-grow flex justify-center p-4'}>
          { getCarousel() }
        </div>
        : '' }
        <div className={hasImages() ? 'w-full md:w-1/2' : ''}>
          <div className="text-xl font-semibold my-3">
            {report?.title}
          </div>
          <Separator className="my-3" />
          <div>
            <ReactMarkdown>{report?.description}</ReactMarkdown>
          </div>
        </div>
      </div>
    </DetailPageLayout>
  )
}

export default ReportDetail
