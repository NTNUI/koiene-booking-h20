export interface KoieNameSlug {
  name: string;
  slug: string;
}

export type AdminReportKoieDictionary = { [slug: string]: KoieNameSlug };
