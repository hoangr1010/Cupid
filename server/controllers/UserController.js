// import User from "../models/User.js";
import { 
    User,
    UserExperience,
    UserEducation,
    // UserContact 
} from "../models/User.js";

// create user profile -- POST
export const createUser = async (req, res) => {
    try {
        const { linkedin_id, email, first_name, last_name } = req.body;
        const newUser = await User.create({ 
            linkedin_id, 
            email, 
            first_name, 
            last_name 
        });

        res.status(201).json({ 
            message: 'User created successfully', 
            data: newUser 
        });

    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating course', 
            error: error.message 
        });
    }
};

// get user profile -- GET
export const getUser = async (req, res) => {
    try {
        const { linkedin_id, email } = req.headers;
        const user_profile = await User.findOne({ linkedin_id, email });
        res.status(201).json({ 
            message: 'User created successfully', 
            data: user_profile 
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error getting user profile', 
            error: error.message 
        });
    }
}

// add user experience -- POST
export const addExperience = async (req, res) => {
    try {
        const { position, organization, start_date, end_date } = req.body;
        const newExperience = await UserExperience.create({ 
            position, 
            organization, 
            start_date, 
            end_date 
        });

        res.status(201).json({ 
            message: 'Experience created successfully', 
            data: newExperience
        });

    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating new experience', 
            error: error.message 
        });
    }
}

// edit user experience -- PUT

// delete user experience -- DELETE


