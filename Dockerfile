# The first stage
# Build React static files
FROM node:13.12.0-alpine as build

WORKDIR /app/frontend
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci --silent
COPY . ./
RUN npm run build

# The second stage
# Copy React static files and start nginx
FROM nginx:stable-alpine
COPY --from=build /app/frontend/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf

COPY ./nginx.conf /etc/nginx/conf.d
CMD ["nginx", "-g", "daemon off;"]