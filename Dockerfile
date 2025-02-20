FROM node:20-alpine AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json", "./"]
RUN npm i
COPY . .
RUN npm run build:prod


FROM node:20-alpine
ARG NODE_ENV
WORKDIR /app
COPY ["package.json","package-lock.json",  "./"]
RUN npm i -g serve
RUN npm i
COPY --from=builder /app/build ./build
EXPOSE 4000
CMD ["serve","-l","4000","-s","build"]