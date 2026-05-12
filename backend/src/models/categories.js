import mongoose, {Schema, model} from 'mongoose'

const categoriesSchema = new Schema({
    categoryName: {type: String},
    description:{type: String},
    color:{type: String},
    isActive:{type: String},
}, {
    timestamps: true,
    strict: false
});

export default model ("Categories", categoriesSchema)

