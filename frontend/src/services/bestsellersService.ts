import { config } from "../config";
import { IBook } from "../interfaces/BestsellerList";
import { BestsellerListName } from "../interfaces/BestsellerListNames";
import { Agent } from "./agent";

const agent = new Agent(config.apis.bestsellers.baseURL);
let bestsellerListNames: BestsellerListName[] = [];
let populatedBestsellerLists: { [key: string]: any } = {};

export const bestsellersService = {
  getBestsellerListNames: async (forceUpdate?: boolean) => {
    if (forceUpdate || bestsellerListNames.length === 0) {
      const response = await agent.get<BestsellerListName[]>("/");
      bestsellerListNames = response;
    }
    return bestsellerListNames;
  },
  getBestsellerList: async (listName: string, forceUpdate?: boolean) => {
    if (forceUpdate || !populatedBestsellerLists[listName]) {
      const response = await agent.get<IBook[]>(`/${listName}`);
      populatedBestsellerLists[listName] = response;
    }
    return populatedBestsellerLists[listName];
  },
};
