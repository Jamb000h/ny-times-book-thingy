import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

interface Book {
  rank: number;
  list_name: string;
  book_details: BookDetails[];
  reviews: Array<{ [key: string]: any }>;
}

export interface BookDetails {
  title: string;
  author: string;
  primary_isbn13: string;
  primary_isbn10: string;
}

export interface BestsellerList extends Array<Book> {}

const bookDetailsSchema: JSONSchemaType<BookDetails> = {
  type: "object",
  properties: {
    title: { type: "string" },
    author: { type: "string" },
    primary_isbn13: { type: "string" },
    primary_isbn10: { type: "string" },
  },
  required: ["title", "author", "primary_isbn13", "primary_isbn10"],
  additionalProperties: true,
};

const bookSchema: JSONSchemaType<Book> = {
  type: "object",
  properties: {
    rank: { type: "number" },
    list_name: { type: "string" },
    book_details: {
      type: "array",
      items: bookDetailsSchema,
    },
    reviews: {
      type: "array",
      items: {
        type: "object",
        properties: {},
      },
    },
  },
  required: ["rank", "list_name", "book_details", "reviews"],
  additionalProperties: true,
};

const schema: JSONSchemaType<BestsellerList> = {
  type: "array",
  items: bookSchema,
};

export default ajv.compile(schema);
