# momentApp
Dockerized simple auth app 

Database Configuration
Production Environment
For the production environment, make sure to set the following environment variables:

DATABASE_PROD_PASSWORD: Your database password.
DATABASE_PROD_NAME: The name of your production database.
DATABASE_PROD_USERNAME: Your database username.
DATABASE_PROD_PORT: Set the port to 5432.
DATABASE_PROD_HOSTNAME: Set the hostname to localhost if you want your database to run locally.
Token Configuration
Set the following environment variable for token generation and validation:

TOKEN_SECRET: Create a JWT (JSON Web Token) and paste it here as the secret key.