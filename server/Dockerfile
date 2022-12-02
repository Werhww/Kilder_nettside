FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm i


COPY . .

ENV PORT=7557

CMD [ "npm", "start" ]

EXPOSE 7557