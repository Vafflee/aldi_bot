FROM node:14 as base

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "tsconfig.json", "nodemon.json", ".env", "./"]
# COPY package.json ./
# COPY yarn.lock ./
# COPY tsconfig.json ./
COPY prisma ./prisma
COPY ./src ./src

RUN yarn cache clean && yarn install
# RUN yarn run build

# CMD yarn run start:migrate
# CMD yarn run dev
FROM base as production

ENV NODE_PATH=./build

RUN yarn run build
# EXPOSE 3000