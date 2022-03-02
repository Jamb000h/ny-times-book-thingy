import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 3001,
  apis: {
    nyTimesBooks: {
      baseURL: "https://api.nytimes.com/svc/books/v3",
      apiKey: process.env.NYTIMES_BOOKS_API_KEY,
    },
  },
};
