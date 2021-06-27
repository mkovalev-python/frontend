FROM node

WORKDIR /app
COPY. /app/

RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx","-g","daemon off;"]