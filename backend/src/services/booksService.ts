// Corresponds to NY Times Books API
// https://developer.nytimes.com/docs/books-product/1/overview

import axios from "axios";
import config from "config";
import { BestsellerList, Book, Review } from "interfaces/booksService";

// Preferable to add default config to a specific agent instead of
// axios default export to have the possibility of having
// separate agents with different default configs for separate APIs
const { baseURL, apiKey } = config.apis.nyTimesBooks;
const agent = axios.create({
  baseURL,
  params: {
    "api-key": apiKey,
  },
});

const booksService = {
  getBestsellerLists: async (): Promise<BestsellerList[]> => {
    const response = await agent.get("/lists/names.json");
    // TODO: Validate response
    return response.data.results;
  },

  getBooksForBestsellerList: async (listName: string): Promise<Book[]> => {
    const response = await agent.get(`/lists.json`, {
      params: { list: listName },
    });
    // TODO: Validate response
    return response.data.results;
  },

  getReviewsForBook: async (isbn: string): Promise<Review[]> => {
    const response = await agent.get(`/reviews.json`, {
      params: { isbn },
    });
    // TODO: Validate response
    return response.data.results;
  },
};

export default booksService;
