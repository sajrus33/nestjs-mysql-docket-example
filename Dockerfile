#FROM mysql:8.0

#FROM node:12.13-alpine As development
#
#WORKDIR /src/app
#
#COPY package*.json ./
#
#RUN npm install --only=development
#
#COPY . .
#
#RUN npm run build
#
#FROM node:12.13-alpine as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /src/app
#
#COPY package*.json ./
#
#RUN npm install --only=production
#
#COPY . .
#
#COPY --from=development /src/app/dist ./dist
#
#CMD ["node", "dist/main"]



#FROM node:stretch-slim
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY . .
#
#EXPOSE 8005
#
#CMD ["npm", "start"]


FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:12.19.0-alpine3.9 as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
