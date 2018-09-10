# Barbershop Finder

## Description
<p>
A finder app that will help you find barbershop and make reservation for that. Users also see all information about barbershop, operating hours, everything related to barbershop. Users can reviews and rate them.</p>

## Main Features :  
### Users
1. Login via fb / google / email
2. Sign up via fb / google / email 
3. View user profile
4. Edit user profile
5. Make a reservation
6. Reschedule a reservation
7. Upload payment proof
8. See reservation history
7. Review and rate barbershop
8. Forgot password

### Barbershop
1. Create barbershop
6. Edit barbershop  
7. Create barbershop service price
8. Edit barbershop service price
9. Delete barbershop service price
8. Create barbershop operating hours
9. Edit barbershop operating hours
10. Delete barbershop operating hours
11. Approve the payment
12. Send voucher to user that has reserved, via email (pdf format)
13. See booked reservation, filter by date

## Tables
### SQL
1. User<br>
** create, read, update, forgot password<br>
3. Barbershop<br> ** create, read, update
4. Barbershop service<br> ** create, read, update, delete
5. Barbershop operating hours <br> ** create, read, update, delete
6. Barbershop images <br>
7. Reservation<br> create, update, read
8. Reservation status

### NO SQL
1. Review
2. Comment

## Migration
This section for database migration, add column, remove column, add table, etc. For more detail informations, visit this link http://docs.sequelizejs.com/manual/tutorial/migrations.html.

Before that, make sure you have installed packages ```sequelize``` and ```sequelize-cli```.<br>

Install the packages

```javascript
npm i --save sequelize sequelize-cli
```

Run migration:
- Move into migration folder
- Change username, password, database in config.json
- execute this script
```javascript
sequelize db:migrate
```

