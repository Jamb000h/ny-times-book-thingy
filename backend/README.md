# NY Times Books API testing backend

Runs a simple express backend via ts-node.

## Running

Before running create a `.env` in the root folder and fill the following information:

- PORT (defaults to 3000)
- NYTIMES_BOOKS_API_KEY=\<your api key here\>

### Commands

`dev` runs the server in watch mode (nodemon + ts-node) for a nice devX

## TODO

- Caching support (redis)
- Better error handling
