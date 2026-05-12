import mongoose, {Schema, model} from 'mongoose'

const teachersSchema = new Schema({
    nameTeacher: {type: String},
    lastName: {type: String},
    email: {type: String},
    password: {type: String},
    phone: {type: String},
    speciality: {type: String},
    isActive: {type: Boolean},
    isVerified: {type: Boolean},
    loginAttemps: {type: Number},
    timeOut: {type: Boolean}
}, {
    timestamps: true,
    strict: false
});

export default model ("Teachers", teachersSchema)