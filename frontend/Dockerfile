# Stage 1: Build stage
FROM node:16 as build

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build

# Stage 2: Production stage
FROM nginx:latest as prod

COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf

CMD ["nginx", "-g", "daemon off;"]