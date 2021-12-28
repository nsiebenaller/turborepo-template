# Production Deployment

FROM node:16

COPY . .

RUN yarn install
RUN yarn build --scope=api --scope=db-main

CMD yarn workspace api start