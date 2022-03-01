import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

export interface Review {
  url: string;
  byline: string;
}

export interface Reviews extends Array<Review> {}

const reviewSchema: JSONSchemaType<Review> = {
  type: "object",
  properties: {
    url: { type: "string" },
    byline: { type: "string" },
  },
  required: ["url", "byline"],
  additionalProperties: true,
};

const schema: JSONSchemaType<Reviews> = {
  type: "array",
  items: reviewSchema,
};

export default ajv.compile(schema);
