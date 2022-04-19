import React from 'react';
import { useHistory } from 'react-router-dom';

const EndPage = () => {
    let history = useHistory();

    function handleSignUp() {
        history.push('/signup');
    };

    function handleLogin() {
        history.push('/login');
    };
    
    return (
        <div className="end-page-wrapper">
            <div className="header-bar">
                <div className="nav-container">
                    <div className="svg-logo">

                    </div>
                    <div className="nav-btns">
                        <button type="button" className="top-sign-up" onClick={handleSignUp}>SIGN UP</button>
                        <button type="button" className="top-login" onClick={handleLogin}>LOGIN</button>
                    </div>
                </div>
            </div>
            <div className="end-banner-text">

            </div>
        </div>
    )
}

export default EndPage;
