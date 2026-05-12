import mongoose, {Schema, model} from 'mongoose'

const taskSchema = new Schema({
    tittle: {type: String},
    description:{type: String},
    dueDate:{type: Date},
    priority:{type: String},
    status:{type: Boolean}
}, {
    timestamps: true,
    strict: false
});

export default model ("Tasks", taskSchema)