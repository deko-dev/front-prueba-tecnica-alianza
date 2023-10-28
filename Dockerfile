FROM node:14-alpine AS build

WORKDIR /dist/src/app

RUN npm cache clean --force

COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:latest AS ngi

COPY --from=build /dist/src/app/dist/* /usr/share/nginx/html
COPY ./ngnix.conf  /etc/nginx/conf.d/default.conf

EXPOSE 3002
