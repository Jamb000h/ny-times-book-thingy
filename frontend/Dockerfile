FROM node:16.13.1-alpine3.14

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

COPY ./src ./src

COPY ./public ./public

RUN npm ci

RUN npm run build

CMD npx serve -s build -p 3000