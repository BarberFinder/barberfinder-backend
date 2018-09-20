# Barbershop Finder API

## Tech Stack
* [**Express**](https://expressjs.com/) Node.js Framework
* [**Passport**](http://www.passportjs.org/) Authentication
* [**MySQL**](https://www.mysql.com/) SQL Database
* [**bcrypt**](https://github.com/kelektiv/node.bcrypt.js) Password hashing function
* [**Sequelize**](http://docs.sequelizejs.com/) ORM For Node.js

## Preparation
### Database
Install `mysql`

## Installation and Configuration

1. Run: `npm install` to install the dependencies
2. Create database
3. Edit .env
4. Run: `sequelize db:migrate`
   [**Sequelize Docs**](http://docs.sequelizejs.com/manual/tutorial/migrations.html)

---
## Running

### Development
 Run: `npm run dev` to run server
### Production
Run: `npm run start` to run server

---
## API Endpoints
### Authentication
`Authorization: Bearer jwt.token.here`

### `/auth`
| Endpoint | HTTP | Description | Body | Return |
|---|---|---|---|---|
| `/auth/signup` | POST | Sign up | `firstname`, `lastname`,`username`,`email`,`password`,`phone`,`birthday` | [user](#user) |
| `/auth/login` | POST | Log In | `username`,`password` | [user](#user), [token](#jwt-token) |

### `/user`
| Endpoint | HTTP | Description | Body | Return |
|---|---|---|---|---|
| `/user/` | GET | Get current user data | - | [user](#user)|

### `/barber`
| Endpoint | HTTP | Description | Body | Return |
|---|---|---|---|---|
| `/barber/` | GET | ... | `edit` | ... |
| `/barber/list` | GET | Get all barbershops data | `reservation` | - |
| `/barber/:barbershopId` | GET | Get barbershop data by Id | ... | ... |
| `/barber/create` | POST | Make a barbershop | `image`,`name`, `tagline`,`phone`,`address`,`city`,`service name`, `operation hours` | - |
| `/barber/changeImage` | PUT | Change Image | - | - |

### `/reservation`
| Endpoint | HTTP | Description | Body | Return |
|---|---|---|---|---|
| `/reservation/create` | POST | Make a reservation | ... | - |
