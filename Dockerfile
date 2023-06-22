FROM node:18 as builder

# Create app dir
WORKDIR /app

COPY package.json ./
COPY yarn.lock ./
COPY prisma ./prisma
COPY .env .

RUN yarn install

COPY . .

RUN yarn run build

FROM node:18

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.env ./
COPY --from=builder /app/prisma ./prisma

COPY --from=builder /app/build ./build

EXPOSE 3000
CMD [ "yarn", "run", "start:prod" ]