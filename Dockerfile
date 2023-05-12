FROM node

WORKDIR /app

COPY package*.json yarn.lock /./
RUN yarn install

COPY . .

ENV MONGODB_USERNAME=admin
ENV MONGODB_PASSWORD=password
RUN yarn global add @nestjs/cli
RUN yarn build

CMD ["yarn", "start:prod"]



