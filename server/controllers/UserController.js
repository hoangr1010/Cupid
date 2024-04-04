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
        const data = req.body;
        const newUser = await User.create(data);

        res.status(201).json({ 
            message: 'User created successfully', 
            data: newUser,
        });

    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating course', 
            error: error.message,
        });
    }
};

// add user experience -- POST
export const addExperience = async (req, res) => {
    try {
        const { _id } = req.headers;
        const data = req.body;
        const newExp = await UserExperience.create(data);
        
        await User.updateOne(
            { _id },
            { $push: { experience: newExp } }
        );

        res.status(201).json({ 
            message: 'Experience created successfully', 
            data: newExp,
        });

    } catch (error) {
        res.status(400).json({ 
            message: 'Error creating new experience', 
            error: error.message,
        });
    }
}