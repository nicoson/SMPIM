FROM node:18.12.0-alpine

RUN apk add vim wget curl
RUN mkdir /workspace

COPY ./server /workspace/server/
EXPOSE 80 3000 3333 443

WORKDIR /workspace/server
CMD ["npm", "prd"]