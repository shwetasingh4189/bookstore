FROM node:14 AS ui-build
WORKDIR /usr/src/app
COPY bookstore/ ./bookstore/
RUN cd bookstore && npm install @angular/cli && npm install && npm run build

FROM node:14 AS server-build
WORKDIR /root/
COPY --from=ui-build /usr/src/app/bookstore/dist ./bookstore/dist
COPY package*.json ./
RUN npm install
COPY server.js .

EXPOSE 3090

CMD ["node", "server.js"]
