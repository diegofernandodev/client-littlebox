FROM node:21-alpine3.18 AS build
WORKDIR /littlebox
COPY package*.json ./
RUN npm install
RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build
FROM nginx:stable

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf


COPY --from=build /littlebox/dist/little-box-fe/ /usr/share/nginx/html

EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

