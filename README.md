# Report management API
## Prerequisites
- You must have docker and docker-compose installed to run the project

## Running the project 
- First clone the repository
- Copy .env.example to .env file and set your timezone and port
- CD into project root and run docker-compose up -d
- Browse to localhost:{HOST_PORT} to open management ui

## Seeding reports
- docker-compose exec app npm run seed

## Running the tests
- docker-compose exec app npm test