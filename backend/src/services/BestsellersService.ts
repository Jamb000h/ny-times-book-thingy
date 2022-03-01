// Corresponds to NY Times Books API
// https://developer.nytimes.com/docs/books-product/1/overview

import axios, { AxiosInstance } from "axios";
import config from "config";

class BestsellersService {
  private agent: AxiosInstance;

  constructor() {
    const { baseURL, apiKey } = config.apis.nyTimesBooks;
    const agent = axios.create({
      baseURL,
      params: {
        "api-key": apiKey,
      },
    });
    this.agent = agent;
  }

  async getBestsellerListNames() {
    const response = await this.agent.get("/lists/names.json");
    return response.data.results;
  }

  async getBestsellerList(listName: string) {
    const response = await this.agent.get(`/lists.json`, {
      params: { list: listName },
    });

    return response.data.results;
  }

  async getReviews(isbn: string) {
    const response = await this.agent.get(`/reviews.json`, {
      params: {
        isbn,
      },
    });

    return response.data.results;
  }
}

export default BestsellersService;
