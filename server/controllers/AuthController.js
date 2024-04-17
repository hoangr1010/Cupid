import axios from "axios";
import User from "../models/User.js";

export const getUserInfo = async (req, res) => {
  const authCode = req.params.authCode;

  try {
    // Call LinkedIn API to get user info
    const accessToken = await getLinkedInToken(authCode);
    const userInfo = await getUserData(accessToken);
    let exist = true;

    // Check if data exists in the database
    let userProfile = await User.findOne({
      email: userInfo.email,
      linkedin_id: userInfo.sub,
    });

    // if userProfile not exist, create new userProfile
    if (userProfile == null) {
      exist = false;
      userProfile = await User.create({
        email: userInfo.email,
        linkedin_id: userInfo.sub,
        first_name: userInfo.given_name,
        last_name: userInfo.family_name,
      });
    }

    res.status(200).send({
      userInfo: userProfile,
      exist: exist,
    });
  } catch (err) {
    res.status(400).send({
      message: err.message,
    });
  }
};

// HANDLERS
async function getLinkedInToken(authCode) {
  try {
    const response = await axios.post(
      "https://www.linkedin.com/oauth/v2/accessToken",
      {
        grant_type: "authorization_code",
        code: authCode,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_ClIENT_SECRET,
        redirect_uri: "http://localhost:3000/auth/redirect",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return response.data.access_token;
  } catch (error) {
    console.log(process.env.LINKEDIN_CLIENT_ID);
    console.log(error);
    throw new Error("Failed to get LinkedIn token");
  }
}

async function getUserData(token) {
  try {
    const response = await axios.get("https://api.linkedin.com/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get user data from LinkedIn");
  }
}
