import { Schema, model } from "mongoose";
import { CommentModel } from "../models/comment.model.js"

const articleSchema = new Schema(
    {
        title: { type: String, required: true, minLength: 3, maxLength: 200},
        content: { type: String, required: true, minLength: 50 },
        excerpt: { type: String, required: false, maxLength: 500 },
        status: { type: String, enum: ['published', 'archived'], default: 'published'},
        author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
        deleted: { type: Boolean, default: false }
    },
    { timestamps: true
    }
)

articleSchema.pre(
    'findByIdAndDelete', async function (next) {
        const article = await this.model.findOne(this.getFilter());
    if (article) {
        await CommentModel.deleteMany({ article: article._id});
        }
        next();
    });

export const ArticleModel = model("Article", articleSchema);