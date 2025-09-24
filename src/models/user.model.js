import { Schema, model } from "mongoose";
import { ArticleModel } from "./article.model";
import { CommentModel } from "./comment.model.js";

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
        },
        deleted: { type: Boolean, default: false },
    },
    { timestamps: true
    }
);

// Middleware para manejar el soft delete en usuarios y sus artículos y comentarios asociados

userSchema.pre(
    'findByIdAndUpdate', async function (next) {
        const user = await this.model.findOne(this.getFilter());
    if (user) {
        await ArticleModel.updateMany({ author: user._id},{ deleted: true });
        await CommentModel.updateMany({ author: user._id},{ deleted: true });
        }
        next();
    });


export const UserModel = model("User", userSchema);