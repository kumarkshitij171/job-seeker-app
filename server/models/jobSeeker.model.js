import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const jobSeekerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    qualifications: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        default: 'No experience',
    },
    resume: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// before save the password will be hashed
jobSeekerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);
export default JobSeeker;