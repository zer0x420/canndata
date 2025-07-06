
import type { Strain } from "@/schema/strain";

export const getStrainDetailTags = (strain: Strain) : string[] => {
    return strain?.terpene ?? [];
}

export const getStrainDetailStats = (strain: Strain): Record<string,string> => {
    const stats: Record<string,string> = {};

    if(strain.genetics){
        stats["Genetics"] = strain.genetics;
    }
    if(strain.thc){
        stats["THC"] = `${strain.thc?.min} % - ${strain.thc?.max} %`;
    }
    if(strain.cbd){
        stats["CBD"] = `${strain.cbd?.min} % - ${strain.cbd?.max} %`;
    }

    return stats;
}