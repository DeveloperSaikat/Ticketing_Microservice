import express, {Request, Response} from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequetError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin',
    [
        body('email')
        .isEmail()
        .withMessage('Email must be valid'),
        body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
    ],
    validateRequest,
    async (req: Request, res: Response) => { 
        const { email, password } = req.body;

        const existingUser = await User.findOne({email})
        if(!existingUser) {
            console.log('User does not exist');
            throw new BadRequetError('Invalid Credentials');
        }

        const passwordsMatch = await Password.compare(existingUser.password, password);

        if(!passwordsMatch) {
            console.log('Password dont match');
            throw new BadRequetError('Invalid Credentials');
        }

        const userJWT = jwt.sign({
            id: existingUser.id,
            email: existingUser.email
        }, 
        'somesupersecret');

        req.session = {
            jwt: userJWT
        }

        res.status(200).send(existingUser);
    }
);

export { router as signinRouter };