# build stage
FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
#RUN apk add --no-cache python3 py3-pip make g++
RUN yarn install
COPY . .
RUN npm run lint
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
