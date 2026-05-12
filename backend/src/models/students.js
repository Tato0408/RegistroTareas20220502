import mongoose, {Schema, model} from 'mongoose'

const studentsSchema = new Schema({
    name: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    bithDate: {type: Date},
    phone: {type: String},
    grade: {type: String},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Boolean}
}, {
    timestamps: true,
    strict: false
});

export default model ("Students", studentsSchema)