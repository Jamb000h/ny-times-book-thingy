import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

interface BestsellerListDetails {
  list_name: string;
  list_name_encoded: string;
  oldest_published_date: string;
  newest_published_date: string;
  updated: string;
}

const bestsellerListDetailsSchema: JSONSchemaType<BestsellerListDetails> = {
  type: "object",
  properties: {
    list_name: { type: "string" },
    list_name_encoded: { type: "string" },
    oldest_published_date: { type: "string" },
    newest_published_date: { type: "string" },
    updated: { type: "string" },
  },
  required: [
    "list_name",
    "list_name_encoded",
    "oldest_published_date",
    "newest_published_date",
    "updated",
  ],
  additionalProperties: true,
};

const schema: JSONSchemaType<BestsellerListDetails[]> = {
  type: "array",
  items: bestsellerListDetailsSchema,
};

export default ajv.compile(schema);
