import Ajv, { JSONSchemaType } from "ajv";
const ajv = new Ajv();

interface BestsellerListName {
  list_name: string;
  list_name_encoded: string;
  // These are interesting for caching purposes
  newest_published_date: string;
  updated: string;
}

interface BestsellerListNames extends Array<BestsellerListName> {}

const bestsellerListNameSchema: JSONSchemaType<BestsellerListName> = {
  type: "object",
  properties: {
    list_name: { type: "string" },
    list_name_encoded: { type: "string" },
    newest_published_date: { type: "string" },
    updated: { type: "string" },
  },
  required: [
    "list_name",
    "list_name_encoded",
    "newest_published_date",
    "updated",
  ],
  additionalProperties: true,
};

const schema: JSONSchemaType<BestsellerListNames> = {
  type: "array",
  items: bestsellerListNameSchema,
};

export default ajv.compile(schema);
