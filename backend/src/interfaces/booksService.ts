// https://developer.nytimes.com/docs/books-product/1/routes/lists.json/get
export interface BestsellerListResponse {
  results: Book[];
  [key: string]: any;
}

//https://developer.nytimes.com/docs/books-product/1/routes/lists/names.json/get
export interface BestsellerListNamesResponse {
  results: BestsellerList[];
  [key: string]: any;
}

// https://developer.nytimes.com/docs/books-product/1/routes/reviews.json/get
export interface ReviewsResponse {
  results: Review[];
  [key: string]: any;
}

export interface BestsellerList {
  list_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
  [key: string]: any;
}

export interface Book {
  rank: number;
  book_details: BookDetails;
  [key: string]: any;
}

export interface BookDetails {
  title: string;
  author: string;
  primary_isbn13: string;
  primary_isbn10: string;
  [key: string]: any;
}

export interface Review {
  url: string;
  byline: string;
  [key: string]: any;
}
