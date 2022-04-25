import React from 'react';
import { useHistory } from 'react-router-dom';
import './EndPage.css';

const EndPage = () => {
    let history = useHistory();

    function handleSignUp() {
        history.push('/signup');
    };

    function handleLogin() {
        history.push('/login');
    };

    const handleLogo = () => {
        history.push('/');
    };

    return (
        <div className="end-page-wrapper">
            <div className="end-header-bar">
                <div className="end-nav-container">
                    <div className="svg-logo">
                        <img className="rare-form-logo-user-forms" src="../../../../static/signup.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
                    </div>
                    <div className="nav-btns">
                        <button type="button" className="top-sign-up" onClick={handleSignUp}>SIGN UP</button>
                        <button type="button" className="top-login" onClick={handleLogin}>LOGIN</button>
                    </div>
                </div>
            </div>
            <div className="end-banner-text">
                <div className="end-banner-content">
                    <h1>Thanks for filling out my form!</h1>
                    <p>Want to create your own form? It's free, quick, and easy!</p>
                </div>
            </div>
        </div>
    )
}

export default EndPage;
