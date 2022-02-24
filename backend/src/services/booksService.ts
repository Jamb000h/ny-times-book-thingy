// Corresponds to NY Times Books API
// https://developer.nytimes.com/docs/books-product/1/overview

import axios from "axios"; // Could be e.g. fetch just as well
import config from "config";
import { BestsellerListName } from "interfaces/booksAPI";

const { baseURL, apiKey } = config.apis.nyTimesBooks;
const agent = axios.create({
  baseURL,
  params: {
    "api-key": apiKey,
  },
});

const booksService = {
  getBestsellerListNames: async (): Promise<BestsellerListName[]> => {
    const response = await agent.get("/names.json");
    return response.data.results;
  },
};

export default booksService;
