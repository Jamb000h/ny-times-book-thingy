import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

export interface Review {
  url: string;
  byline: string;
  isbn13: string;
}

const reviewSchema: JSONSchemaType<Review> = {
  type: "object",
  properties: {
    url: { type: "string" },
    byline: { type: "string" },
    isbn13: { type: "string" },
  },
  required: ["url", "byline", "isbn13"],
  additionalProperties: true,
};

const schema: JSONSchemaType<Review[]> = {
  type: "array",
  items: reviewSchema,
};

export default ajv.compile(schema);
