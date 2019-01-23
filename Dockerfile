FROM node:8.12.0

RUN mkdir -p /opt/apps/expressfriends
WORKDIR /opt/apps/expressfriends

COPY ./package.json /opt/apps/expressfriends/package.json

# improve requirements build cache
RUN npm install

COPY . /opt/apps/expressfriends

ENV PORT 80
EXPOSE 80

CMD npm start
