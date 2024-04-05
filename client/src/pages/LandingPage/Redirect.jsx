import React from 'react'
import { LoadingIcon } from "./../../components/icons/LoadingIcon"
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { changeUser } from '../../state';

const Redirect = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');
    const navigate = useNavigate();
    const dispatch = useDispatch()

    React.useEffect(() => {
        if (authCode) {
            getUserInfo(authCode)
        }
    }, []);

    // CONTROLLERS
    async function getUserInfo(authCode) {
        try {

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/linkedin/${authCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            
            // put data into redux
            dispatch(changeUser(data.userInfo));

            // redirect to page
            if (data.exist) {
                navigate('/profile');
            } else {
                navigate('/onboard');
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="text-center h-screen items-center">
            <div role="status">
                <LoadingIcon />
                <span className="sr-only">Loading...</span>
                <p>
                    Loading...
                </p>
            </div>
        </div>

    )
}

export default Redirect
