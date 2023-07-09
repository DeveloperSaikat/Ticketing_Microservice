import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import 'express-async-errors'; //Adding this to handle errors that are generated in sync functions

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true); // this has been added as the traffic will be coming from ingress
app.use(json());
app.use(
    cookieSession({
        signed: false, // Since JWT are by default tamper proof
        //secure: true // Cookies can only be handled if you are in https connection
    })
)

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', () => {
    throw new NotFoundError();  
})

app.use(errorHandler);

const start = async () => {
    try {
        await mongoose.connect('#');
        console.log('connected to MongoDB');
    }
    catch (err) {
        console.error(err);
    }

    app.listen(3000, () => {
        console.log('Connected to 3000');
    });
}

start();


