FROM node:18 as base

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "tsconfig.json", "nodemon.json", ".env", "./"]
COPY prisma ./prisma
COPY ./src ./src

RUN yarn cache clean && yarn install
# RUN yarn run build

# CMD yarn run dev
FROM base as production
RUN yarn run build
# EXPOSE 3000