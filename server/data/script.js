import { openings, requests, users } from './sampleData.js';
import Opening from './../models/Opening.js';
import User from './../models/User.js';
import Request from './../models/Request.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

try {
    console.log(process.env.DATABASE_CONNECTION_STRING)

    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("Successfully connect to MongoDB");
} catch (error) {
    console.log(error);
    process.exit(0);
}

const writeSampleData = async () => { 
    try {
        await Opening.insertMany(openings);
        await Request.insertMany(requests);
        await User.insertMany(users);
        console.log('Sample data created successfully');
    } catch (error) {
        console.error('Error creating sample data', error);
    }
}