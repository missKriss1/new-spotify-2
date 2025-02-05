import mongoose, {HydratedDocument, Model} from "mongoose";
import bcrypt from "bcrypt";
import {randomUUID} from "node:crypto";
import {UsersFiled} from "../types";

interface UserMethod{
    checkPassword(password: string): Promise<boolean>;
    generateToken(): void
}

type UserModal = Model<UsersFiled, {}, UserMethod>

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema<
    HydratedDocument<UsersFiled>,
    UserModal,
    UserMethod
>({
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator : async function (this: HydratedDocument<UsersFiled>,value: string): Promise<boolean> {
                if(!this.isModified('username')) return true;
                const user:UsersFiled | null = await User.findOne({username: value});
                return !user;
            },
            message: 'This username is already taken'
        }
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin'],
    },
    token:{
        type: String,
        required: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    googleId: String,
    avatar: {
        type: String,
        default: null,
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
})

userSchema.methods.checkPassword = function (password:string) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateToken = function (){
    this.token = randomUUID();
}

userSchema.set("toJSON", {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
})

const User = mongoose.model("User", userSchema)

export default User