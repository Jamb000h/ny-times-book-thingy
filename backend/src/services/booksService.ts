// Corresponds to NY Times Books API
// https://developer.nytimes.com/docs/books-product/1/overview

import axios from "axios"; // Could be e.g. fetch just as well
import config from "config";
import { BestsellerListItem } from "interfaces/bestsellerListItem";
import { BestsellerListName } from "interfaces/bestsellerListName";
import { ReviewItem } from "interfaces/ReviewItem";

const { baseURL, apiKey } = config.apis.nyTimesBooks;
const agent = axios.create({
  baseURL,
  params: {
    "api-key": apiKey,
  },
});

const booksService = {
  getBestsellerListNames: async (): Promise<BestsellerListName[]> => {
    const response = await agent.get("/lists/names.json");
    return response.data.results;
  },
  getBestsellerList: async (
    listName: string
  ): Promise<BestsellerListItem[]> => {
    const response = await agent.get(`/lists.json`, {
      params: { list: listName },
    });
    return response.data.results;
  },
  getReviews: async (isbn: string): Promise<ReviewItem[]> => {
    const response = await agent.get(`/reviews.json`, {
      params: { isbn },
    });
    return response.data.results;
  },
};

export default booksService;
