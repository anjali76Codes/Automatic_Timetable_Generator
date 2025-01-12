import jwt from 'jsonwebtoken';

const authenticateUser = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Assuming token is passed as Bearer token
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store the decoded user data in the request object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export { authenticateUser };
