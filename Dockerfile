FROM node:16-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json ./
RUN npm i --silent
COPY . .
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'