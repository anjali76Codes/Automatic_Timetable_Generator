import { User } from "../models/user.models.js";

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { College } from "../models/college.models.js";

// SignUp Controller
const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email or username already exists' });
        }

        // Hash password and save new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(201).json({ message: 'User created successfully', token });

    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// SignIn Controller
const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Compare provided password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Respond with token and username
        res.status(200).json({ message: 'Signin successful', token, username: user.username });

    } catch (error) {
        console.error('Error during signin:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getUserColleges = async (req, res) => {
    try {
        // Get token from Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Authorization token is required' });
        }

        // Verify token and get the userId
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Find the user by ID and populate the colleges field
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the colleges associated with the user
        res.status(200).json({ colleges: user.colleges });

    } catch (error) {
        console.error('Error fetching colleges:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Controller to fetch college details by ID
const getCollegeDetails = async (req, res) => {
    const { collegeId } = req.params; // Extract collegeId from request parameters

    try {
        // Fetch the college details from the database
        const college = await College.findById(collegeId);

        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }

        // Return the college details
        res.status(200).json(college);

    } catch (error) {
        console.error('Error fetching college details:', error);
        res.status(500).json({ message: 'Server error' });
    }
};


export { signup, signin, getUserColleges, getCollegeDetails };
