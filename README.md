# Cozastore

This is a e-commerce frontend application, created using ReactJS.

| Contents
|---
| [Demo](#demo)
| [Running the Application with Docker](#docker)
| [Authentication](#authentication)
| [Build](#build)
| [What it does:](#what-it-does)
| - [Guests](#guest-visitors-can)
| - [Members](#logged-members-can-also)

## Demo

Demonstration of app can be see on: https://cozastore-client.onrender.com

## Docker

This project includes a docker-compose.yml file to simplify the process of setting up and running the application using Docker.

Prerequisites

- Docker installed on your local machine.
- Docker Compose installed (usually included with Docker Desktop).

1. Clone the repository:

```
git clone https://github.com/rostislav-ivanov/cozastore-client
cd cozastore-client

```

2. Start the application:

```
docker-compose up

```

3. Access the application:

- Frontend: Visit `http://localhost:8080` to access the frontend application.
- Backend: The backend API will be available at `http://localhost:3030`.

4. Stop the application and remove containers:

```
docker-compose down

```

5. Stop the application and remove containers and images:

```
docker-compose down --rmi all

```

## Authentication

The service is initialized with three users, which can be used for immediate testing:

- peter@abv.bg : 123456
- george@abv.bg : 123456
- admin@abv.bg : admin

The user peter@abv.bg has seed data

## Build

Before run client, run server [cozatore-server](https://github.com/rostislav-ivanov/cozastore-server)

```
node server.js

```

To build the client, run the following commands in the terminal:

```
npm init
npm install
npm run dev

```

## What it does:

The website provides informative and functional webpages for browsing products and navigating through user friendly shopping.The website can be used as a guest visitor and member.

- ### Guest visitors can:
  - [x] see all products in shop
  - [x] quick view of selectid product contain information about size ,color and price
  - [x] see details of selected product with size, color, price, description and matirial
  - [x] see about page
  - [x] see contact page and send an email to site
  - [x] subscribe to newsletter
  - [x] register and login
- ### Logged members can also:
  - [x] add product to cart
  - [x] see the products in bag
  - [x] checkout
    - [x] edit quantity of each product
    - [x] remove product from cart
    - [x] select shipping address
  - [x] add / remove wish
  - [x] see the wishes product
  - [x] manage their account details:
    - [x] profile - edit shipping information
    - [x] orders with their status
    - [x] wish list
    - [x] logout
