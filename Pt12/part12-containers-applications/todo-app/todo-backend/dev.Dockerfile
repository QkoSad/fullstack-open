FROM node:20
  
WORKDIR /usr/src/app


COPY --chown=node:node . .

RUN npm i 

ENV DEBUG=express:*
  

USER node

CMD ["npm", "run", "dev", "--", "--host"]
