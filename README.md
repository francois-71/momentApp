# Project Configuration

This project requires certain environment variables to be set in order to run successfully. Follow the steps below to set up the necessary configurations.

Start by creating a **`.env`** file at the root of the project

## Database Configuration

### Production Environment

For the production environment, make sure to set the following environment variables:

- **`DATABASE_PROD_PASSWORD`**: Your database password.
- **`DATABASE_PROD_NAME`**: The name of your production database.
- **`DATABASE_PROD_USERNAME`**: Your database username.
- **`DATABASE_PROD_PORT`**: Set the port to `5432`.
- **`DATABASE_PROD_HOSTNAME`**: Set the hostname to `localhost` if you want your database to run locally.

## Token Configuration

Set the following environment variable for token generation and validation:

- **`TOKEN_SECRET`**: Create a JWT (JSON Web Token) and paste it here as the secret key.

## Example:

```bash
DATABASE_PROD_PASSWORD=your-password
DATABASE_PROD_NAME=your-database-name
DATABASE_PROD_USERNAME=your-username
DATABASE_PROD_PORT=5432
DATABASE_PROD_HOSTNAME=localhost

TOKEN_SECRET=your-jwt-token
