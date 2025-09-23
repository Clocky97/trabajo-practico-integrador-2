import { Schema, model } from "mongoose";

const userSchema = new Schema(
    {
        username: { type: String, required: true, unique: true, minLength: 3, maxLength: 20 },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ['user', 'admin'], default: 'user' },
        profile: {
            firstName: { type: String, minLength: 2 ,maxLength: 50, required: true },
            lastName: { type: String, minLength: 2, maxLength: 50, required: true },
            biography: { type: String, maxLength: 500, required: false },
            avatarUrl: { type: String, required: false, isUrl: true },
            bithDate: { type: Date, required: false}
        }
    },
    { timestamps: true
    }
);

export const UserModel = model("User", userSchema);