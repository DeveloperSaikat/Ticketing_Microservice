import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

export class Password {
    static async toHash(password: string) {
        const salt = randomBytes(8).toString('hex'); 
        const buf = (await scryptAsync(password, salt, 64)) as Buffer; //this generates a hashed password taking into consideration the salt that got generated
        
        return `${buf.toString('hex')}.${salt}`; //final password that was generated
    }

    static async compare(storePassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storePassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer; //generate the hashed password for the supplied password
        
        return buf.toString('hex') === hashedPassword; //compare if the hashed password is similar to what was stored in DB
    }
}