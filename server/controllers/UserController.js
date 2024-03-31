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

// get user profile -- GET
export const getUser = async (req, res) => {
    try {
        const { linkedin_id, email } = req.body;
        const user_profile = await User.findOne({ linkedin_id, email });
        res.status(201).json({ 
            message: 'User created successfully', 
            data: user_profile,
        });
    } catch (error) {
        res.status(400).json({ 
            message: 'Error getting user profile', 
            error: error.message,
        });
    }
}

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

// edit user experience -- PUT
// rethink the flow of this function
export const editExperience = async (req, res) => {
    try {
        const { _id } = req.headers;
        const data = req.body;

        const newExperience = await UserExperience.findOneAndUpdate(
            { _id },
            data,
        );

        res.status(201).json({
            message: 'Experience updated successfully',
            data: newExperience,
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error editing experience',
            error: error.message,
        });
    }
}

// delete user experience -- DELETE
// export const delExperience = async (req, res) => {
//     try {
//     } catch (error) {
//         res.status(400).json({
//             message: 'Error deleting experience',
//             error: error.message,
//         });
//     }
// }


