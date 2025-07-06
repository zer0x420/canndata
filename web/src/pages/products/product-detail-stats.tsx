
import type { Product } from "@/schema/product";
import type { Strain } from "@/schema/strain";

export const getProductDetailTags = (product: Product) : string[] => {
    const tags: string[] = [];

    if (product?.details?.type) {
        tags.push(`${product?.details.type}`);
    }

    return tags;
}

export const getProductDetailStats = (product: Product): Record<string,string> => {
    const stats: Record<string,string> = {};

    if(product?.details?.type){
        switch (product.details.type) {
        case "Medical":
            stats["Vendor"] = product.details.vendor;
            break;
        case "Recreational":
            stats["Breeder"] = product.details.breeder;
            break;
        default:
            break;
        }
    }

    return stats;
}

export const getProductStrainDetailStats = (strain: Strain | undefined): Record<string,string> => {
    const stats: Record<string,string> = {};

    if(strain?.genetics){
        stats["Genetics"] = strain.genetics;
    }
    if(strain?.thc){
        stats["THC"] = `${strain.thc?.min} % - ${strain.thc?.max} %`;
    }
    if(strain?.cbd){
        stats["CBD"] = `${strain.cbd?.min} % - ${strain.cbd?.max} %`;
    }

    return stats;
}