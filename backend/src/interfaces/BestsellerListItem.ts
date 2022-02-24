export interface BookDetails {
  title: string;
  author: string;
  primary_isbn13: string;
  primary_isbn10: string;
  [key: string]: any;
}
export interface BestsellerListItem {
  rank: number;
  book_details: BookDetails;
  [key: string]: any;
}

export interface BestsellerListResponse {
  results: BestsellerListItem[];
  [key: string]: any;
}
