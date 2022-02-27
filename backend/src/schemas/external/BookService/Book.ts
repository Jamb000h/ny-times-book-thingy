import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

interface Book {
  rank: number;
  book_details: BookDetails;
}

interface BookDetails {
  title: string;
  author: string;
  primary_isbn13: string;
  primary_isbn10: string;
}

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
    book_details: bookDetailsSchema,
  },
  required: ["rank", "book_details"],
  additionalProperties: true,
};

const schema: JSONSchemaType<Book[]> = {
  type: "array",
  items: bookSchema,
};

export default ajv.compile(schema);
