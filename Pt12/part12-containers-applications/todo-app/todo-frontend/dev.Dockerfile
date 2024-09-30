
FROM node:20 AS build-stage 

ENV VITE_BACKEND_URL=http://localhost:8080/api/

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["npm", "run", "dev", "--", "--host"]

