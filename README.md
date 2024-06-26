# Backend Shopping Cart System - Home Assignment

## Description
This project is a backend system for a basic shopping cart application. It is designed to evaluate skills in building a backend service that allows users to manage their carts. The system is developed using Node.js with TypeScript for the backend and MySQL for the database, with API documentation provided using Postman.

## Running the Project Locally
To run the project locally using Docker Compose:

- Ensure you have Docker and Docker Compose installed on your machine. if not ues this guid [docker docs](https://docs.docker.com/compose/install/)

- Clone the repository
    ```bash
    git clone https://github.com/Yonatan-Lavie/passport-card-test
    ```

- Navigate to the project directory
    ```bash
    cd passport-card-test
    ```
- In the project directory, start the Docker services:
    ```bash
    # Build and start the Docker containers
    docker-compose up --build
    ```
    The API should now be running and accessible. The MySQL service will also be running within Docker.

- To stop the services:

    ```bash
    # Stop the Docker containers
    docker-compose down
    ```

## Testing the Project with Postman
To test the project using Postman:

1. Open the Postman application.
2. Import the Postman collection file provided in the repository named `passport-cart-test.postman_collection.json`. This file contains pre-configured requests to test the API endpoints.
3. Once imported, you can use the requests in the collection to interact with the running API. Make sure the Docker containers are running before testing.