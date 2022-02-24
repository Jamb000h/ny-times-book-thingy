export interface BestsellerListName {
  list_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
  [key: string]: any;
}

export interface BestsellerListNamesResponse {
  results: BestsellerListName[];
  [key: string]: any;
}
