import { config } from "../config";

const baseUrl = config.apis.bestsellers.baseURL;

export const bestsellersService = {
  getBestsellerLists: async () => {
    const response = await fetch(`${baseUrl}/lists`);
    const data = await response.json();
    return data;
  },
  getBestsellerList: async (listName: string) => {
    const response = await fetch(`${baseUrl}/list/${listName}`);
    const data = await response.json();
    return data;
  },
};
