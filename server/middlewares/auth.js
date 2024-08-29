import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();
export const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.userId = verified.id;
        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: error.message });
    }
}