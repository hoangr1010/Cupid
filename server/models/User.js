import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExperienceSchema = new Schema({
    position: {
        type: String,
        required: true,
        minLength: 5
    },
    organization: {
        type: String,
        required: true,
        minLength: 5
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    }
})

const EducationSchema = new Schema({
    degree: {
        type: String,
        required: true,
        minLength: 5
    },
    organization: {
        type: String,
        required: true,
        minLength: 5
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    }
})

const ContactSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String
    },
    date_of_birth: {
        type: Date,
    },
    location: {
        type: String,
    }
})

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    last_name: {
        type: String,
        required: true,
        minLength: 2,
        maxLength: 50
    },
    last_request_batch: {
        type: Schema.Types.ObjectId,
        ref: "RequestBatch"
    },
    last_opening_batch: {
        type: Schema.Types.ObjectId,
        ref: "OpeningBatch"
    },
    experience: {
        type: ExperienceSchema
    },
    education: {
        type: EducationSchema
    },
    contact: {
        type: ContactSchema
    }
});

export default mongoose.model("User", UserSchema, "Users");