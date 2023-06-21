FROM node:14

WORKDIR /usr/src/app

COPY ["package.json", "yarn.lock", "tsconfig.json", ".env", "./"]
# COPY package.json ./
# COPY yarn.lock ./
# COPY tsconfig.json ./
COPY prisma ./prisma
COPY ./src ./src

RUN yarn cache clean && yarn install
RUN yarn run prisma generate
RUN yarn run build

CMD yarn run start:migrate
# FROM base as production

# ENV NODE_PATH=./build

# RUN npm run build
# EXPOSE 3000