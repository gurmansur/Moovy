## Installation

After following the root README, here's how to run the backend

Go to the backend folder
```bash
cd backend
```

Install dependencies
```bash
npm install
```

## Enviroment Variables

Create a .env file in the backend folder and add these variables to it

`PORT`= 3001

`DB_HOST`= `<your db_host>`

`DB_PORT`= `<your db_port>`

`DB_DATABASE`= `<your database name>`

`DB_USERNAME`= `<your username>`

`DB_PASSWORD`= `<your password>`

`OMDB_APIKEY`= `<your omdb api key>`

<details>
<summary>Example of .env</summary>


```
PORT = 3001
DB_PORT = 5432
DB_HOST = localhost
DB_NAME = moovy
DB_USER = postgres
DB_PASSWORD = admin
OMDB_APIKEY = a58446f4
```

</details>

## Running the app

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
