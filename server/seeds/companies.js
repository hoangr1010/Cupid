import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import Company from "./../src/models/Company.js";
import connectDB from "../src/utils/connectDB.js";

let companies = [];

const getCompanies = async () => {
  for (let page = 0; page <= 104; page++) {
    await axios
      .get(
        `https://api.simplify.jobs/v2/company/?page=${page}&size=100&value=&workflow_completed=false`,
      )
      .then((response) => {
        // Handle the response data here
        companies = companies.concat(response.data.items);
        console.log(companies.length);
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }
};

const insertCompany = async () => {
  try {
    await Company.deleteMany();
    const companyList = await Company.insertMany(companies);
    console.log(`${companyList.length} company created`);
  } catch (error) {
    console.error(error);
  }
};

await connectDB(process.env.DATABASE_CONNECTION_STRING);
await getCompanies();
await insertCompany();
process.exit(0);
