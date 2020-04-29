FROM node:12
WORKDIR /usr/app/
COPY . .
RUN npm install --quiet
EXPOSE 3000
CMD [ "npm", "start" ]
