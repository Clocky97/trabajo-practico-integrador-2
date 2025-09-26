import { Schema, model } from "mongoose";

const commentSchema = new Schema(
    {
        content: { type: String, maxLength: 500 },
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        article: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true
    }
)

export const CommentModel = model ("Comment", commentSchema);