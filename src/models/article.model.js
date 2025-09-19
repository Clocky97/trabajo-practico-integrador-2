import { Schema, model } from "mongoose";

const articleSchema = new Schema(
    {
        title: { type: String, required: true, minLength: 3, maxLength: 200},
        content: { type: String, required: true, minLength: 50 },
        excerpt: { type: String, required: false, maxLength: 500 },
        status: { type: String, enum: ['published', 'archived'], default: 'published'},
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tags: [{ type: String, required: false }],
    },
    { timestamps: true
    }
)

export const ArticleModel = model("Article", articleSchema);