# Step 1: Build the React app
FROM node:20 AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy all files and build the app
COPY . .
RUN npm run build

# Step 2: Serve the React app with a lightweight web server
FROM nginx:alpine

# Copy the build output to the Nginx web server directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]


# docker build -t rostislav1/cozastore-client:0.1 .
# docker tag rostislav1/cozastore-client:0.1 rostislav1/cozastore-client:latest
# docker push rostislav1/cozastore-client:0.1
# docker push rostislav1/cozastore-client:latest
# docker run -p 8080:80 --name cozastore-client -d --rm rostislav1/cozastore-client
# docker stop cozastore-client

