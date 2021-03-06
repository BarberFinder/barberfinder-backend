import createError from 'http-errors';
import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import authRouter from './app/routes/auth';
import barberRouter from './app/routes/barber';
import reservationRouter from './app/routes/reservation';
import userRouter from './app/routes/user';

const app = express();
const PORT = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, './app/public')));

app.use('/auth', authRouter);
app.use('/barber', barberRouter);
app.use('/reservation', reservationRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.listen(PORT, () => console.log(`Application Running on  port ${PORT}`));
