FROM node:20

# Create app directory
WORKDIR /app

COPY . .

EXPOSE 5173

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]