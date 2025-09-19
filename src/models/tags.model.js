import { Schema, model } from "mongoose";

const tagsSchema = new Schema(
    {
        name: { type: String, required: true, unique: true, minLength: 2, maxLength: 30 },
        description: {type: String, required: false, maxlenght: 200},
    },
    { timestamps: true
    }
)

export const TagModel = model("Tag", tagsSchema);