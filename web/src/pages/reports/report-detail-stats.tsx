
import type { Product } from "@/schema/product";
import type { Report } from "@/schema/report"

export const getReportDetailTags = (report: Report) : string[] => {
    const tags: string[] = [];

    if (report?.details?.type) {
        tags.push(`${report.details.type}`);
    }

    if (report.date) {
        tags.push(`${new Date(report?.date).toLocaleDateString()}`);
    }

    if (report.user) {
        tags.push(`${report.user}`);
    }
    return tags;
}

export const getReportDetailStats = (report: Report): Record<string,string> => {
    const stats: Record<string,string> = {};

    if (report?.details) {
        switch (report.details.type) {
            case "Shop":
                stats["Price"] = report.details.price + "€";
                break;
            case "Grow":
                stats["Yield"] = report.details.yield + " g/Watt";
                if(report.details.weeks)
                    stats["Weeks"] = report.details.weeks + "";
                break;
            case "Bubble Hash":
                stats["Yield"] = report.details.yield + "%";
                if(report.details.bagsize)
                    stats["Bags"] = report.details.bagsize?.join(",") + " μm";
                break;
            case "Flower Rosin":
                stats["Yield"] = report.details.yield + "%";
                if(report?.details?.duration)
                    stats["Duration"] = report.details.duration + "s";
                if(report?.details?.temperature)
                    stats["Temperature"] = report.details.temperature + "C°";
                if(report?.details?.bagsize)
                    stats["Bag"] = report.details.bagsize + "μm";
                break;
            default:
                break;
        }

    }

    if (report?.rating) {
        stats["Rating"] = `${report?.rating} / 10`;
    }

    return stats;
}

export const getReportProductDetailStats = (product: Product | undefined): Record<string,string> => {
    const stats: Record<string,string> = {};

    if (product?.details?.type) {
        if (product?.details?.type === "Medical") {
            stats["Vendor"] = product?.details?.vendor;
        }
        if (product?.details?.type === "Recreational") {
            stats["Breeder"] = product?.details?.breeder;
        }
    }

    if (product?.name) {
        stats["Product"] = product.name;
    }

    return stats;
}