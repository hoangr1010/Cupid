import React from 'react'
import { LoadingIcon } from "./../../components/icons/LoadingIcon"

const Redirect = () => {

    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get('code');

    React.useEffect(() => {
        if (authCode) {
            getUserInfo(authCode)
        }
    }, []);

    // CONTROLLERS
    function getUserInfo(authCode) {
        try {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/auth/linkedin/${authCode}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.json())
                .then(data => {
                    console.log(data)
                })
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
