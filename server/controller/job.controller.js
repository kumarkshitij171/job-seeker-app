import JobSeeker from '../models/jobSeeker.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
};

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

export const RegisterJobSeeker = async (req, res) => {
    try {
        const { firstName, lastName, email, password, phone, address, qualifications, experience } = req.body;
        if (!firstName || !email || !password || !phone || !qualifications) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        const resume = req.file?.path;
        if (!resume) {
            return res.status(400).json({ message: 'Resume is required' });
        }

        // check if email already exists
        const jobSeekerExists = await JobSeeker.findOne({ email });
        if (jobSeekerExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const jobSeeker = new JobSeeker({
            firstName, lastName, email, password, phone, address, qualifications, experience, resume
        });

        const jobSeekeruser = await jobSeeker.save();
        if (!jobSeekeruser) {
            return res.status(400).json({ message: 'Failed to create user' });
        }
        const token = jwt.sign({ id: jobSeekeruser._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        jobSeekeruser.password = undefined;
        return res
            .status(201)
            .cookie('token', token, cookieOptions)
            .json({ message: 'Job Application Created', token, user: jobSeekeruser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const LoginJobSeeker = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const jobSeeker = await JobSeeker.findOne({ email });
        if (!jobSeeker) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // bcrypt verify password
        const isMatch = await bcrypt.compare(password, jobSeeker.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: jobSeeker._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
        jobSeeker.password = undefined;
        return res
            .cookie('token', token, cookieOptions)
            .status(200)
            .json({ message: 'Login successful', token, user: jobSeeker });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const LogoutJobSeeker = async (req, res) => {
    try {
        res.clearCookie('token', cookieOptions);
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}

export const profileJobSeeker = async (req, res) => {
    try {
        const token = req.cookies.token;
        const jobSeeker = await JobSeeker.findById(req.userId);
        if (!jobSeeker) {
            return res.status(404).json({ message: 'User not found' });
        }
        // remove password from response
        jobSeeker.password = undefined;

        return res
            .status(200)
            .json({ jobSeeker, token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}