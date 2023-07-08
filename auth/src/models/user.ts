import mongoose from 'mongoose';
import { Password } from '../services/password';

const Schema = mongoose.Schema;

// An interface that describes the properties that are required to create an user
interface UserAttrs {
    email: String,
    password: String
}

// An interface that describes the properties that an user model has
interface UserModel extends mongoose.Model<UserDoc> {
    build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties that a user document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},  {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id;
            delete ret.__v;
        }
    }
});

userSchema.pre('save', async function(done) {// this is a save middleware that gets triggered when adding a document to the db
    if(this.isModified('password')) { //check if the field has been modified
        const hashed = await Password.toHash(this.get('password'));
        this.set('password', hashed); // set the field with the hashed password generated
    } 
    done();
})

userSchema.statics.build = (attrs: UserAttrs) => {
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };