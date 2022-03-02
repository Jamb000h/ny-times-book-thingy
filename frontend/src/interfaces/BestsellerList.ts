export interface IBookDetails {
  title: string;
  author: string;
  isbn: string;
}

export interface IReview {
  byline: string;
  url: string;
}

export interface IBook {
  rank: number;
  book_details: IBookDetails;
  reviews: IReview[];
}
