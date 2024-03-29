import axios from 'axios';

export const getUserInfo = async (req, res) => {
    const authCode = req.params.authCode;
    
    try {
        // Call LinkedIn API to get user info
        const accessToken = await getLinkedInToken(authCode)
        const userInfo = await getUserData(accessToken)

        console.log(userInfo)
        

        res.status(200).send({
            authCode: authCode,
            accessToken: accessToken,
            userInfo: userInfo
        })
    } catch (err) {
        console.log(err)
    }
    
}

// HANDLERS
async function getLinkedInToken(authCode) {
    try {
        const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', {
            grant_type: 'authorization_code',
            code: authCode,
            client_id: '86o8mh6zlpzzd7',
            client_secret: 'CaE2rgyLIg536oXD',
            redirect_uri: 'http://localhost:3000/auth/redirect'
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        console.log(response.data);
        return response.data.access_token;
    } catch (error) {
        console.log(error);
        // throw new Error('Failed to get LinkedIn token');
    }
}

async function getUserData(token) {
    try {
        const response = await axios.get('https://api.linkedin.com/v2/userinfo', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to get user data from LinkedIn');
    }
}