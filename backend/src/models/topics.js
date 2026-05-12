import mongoose, {Schema, model} from 'mongoose'

const topicSchema = new Schema({
    subjectName: {type: String},
    isAviable:{type: Boolean},
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teachers"
    }
}, {
    timestamps: true,
    strict: false
});

export default model ("Topics", topicSchema)

