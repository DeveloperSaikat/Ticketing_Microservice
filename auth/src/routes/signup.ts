import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError  } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.get('/api/users/signup',[
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({min: 4, max: 20}).withMessage('Password must be between 4 to 20 characters')
], (req: Request, res: Response) => {
    const errors = validationResult(req); // The validators that were added will check for errors and if received then will add here

    if(!errors.isEmpty()) {
        throw new RequestValidationError(errors.array());
    }

    console.log('Creating a user');
    throw new DatabaseConnectionError();

    // const { email, password } = req.body; 

    // res.send({msg: "Done"})

        
});

export { router as signupRouter };