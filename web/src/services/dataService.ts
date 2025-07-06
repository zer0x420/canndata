import type { Strain } from "@/schema/strain";
import type { Report } from "@/schema/report";
import type { Product } from "@/schema/product";

const dataCache: Record<string, unknown[]> = {};

function getRequestURL(path: string){
  return new URL(`data/${path}.json`, window.location.origin + import.meta.env.BASE_URL);
}

function getImageURL(path: string, id: string, file: string){
  return new URL(`data/images/${path}/${id}/${file}`, window.location.origin + import.meta.env.BASE_URL);
}


async function getData<T>(path: string): Promise<T[]> {
  if (dataCache[path]) {
    return dataCache[path] as T[];
  }

  const res = await fetch(getRequestURL(path));
  if (!res.ok) {
    throw new Error(`Fetch failed for ${path}: ${res.statusText}`);
  }

  const data = (await res.json()) as T[];
  dataCache[path] = data;
  return data;
}

async function findData<T>(path: string, predicate: (value: T) => boolean): Promise<T | undefined> {
  const data = await getData<T>(path);
  return data.find(predicate);
}

async function filterData<T>(path: string, predicate: (value: T) => boolean): Promise<T[]> {
  const data = await getData<T>(path);
  return data.filter(predicate);
}


// Strains
export async function getStrainsAsync(): Promise<Strain[]> {
  return getData<Strain>("strains");
}

export async function getStrainByIdAsync(id: string): Promise<Strain | undefined> {
  return findData<Strain>("strains", (value) => {
    return value.id == id;
  });
}

// Products
export async function getProductsAsync(): Promise<Product[]> {
  return getData<Product>("products");
}

export async function getProductsByIdAsync(id: string): Promise<Product | undefined> {
  return findData<Product>("products", (value) => {
    return value.id == id;
  });
}

export async function getProductsByStrainIdAsync(strain_id: string): Promise<Product[]> {
  return filterData<Product>("products", (value) => {
    return value.strain_id == strain_id;
  });
}

// Reports
export async function getReportsAsync(): Promise<Report[]> {
  return getData<Report>("reports");
}

export async function getReportByIdAsync(id: string): Promise<Report | undefined> {
  return findData<Report>("reports", (value) => {
    return value.id == id;
  });
}

export async function getReportsByProductIdAsync(product_id: string): Promise<Report[]> {
  return filterData<Report>("reports", (value) => {
    return value.product_id == product_id;
  });
}

export function getReportsImage(id :string, image:string): URL {
  return getImageURL("reports", id, image);
}