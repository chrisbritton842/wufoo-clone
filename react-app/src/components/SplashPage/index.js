import React from 'react';
import { useHistory } from "react-router-dom";

const SplashPage = () => {
    let history = useHistory();

    function handleSignUp() {
        history.push('/sign-up');
    };

    function handleLogin() {
        history.push('/login');
    };

    const handleDemo = () => {
        return
    }



    return (
        <div className="splash-wrapper">
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
            <div className="banner-container">
                <div className="left-banner">
                    <h1>Easy-to-Use Online Form Builder For Every Organization</h1>
                    <p>Cloud-based form builder that makes it easy to create registration forms, application forms, surveys, contact forms, payment forms and more.</p>
                    <div className="banner-btn-row">
                        <button type="button" className="sign-up-free" onClick={handleSignUp}>SIGN UP FREE</button>
                        <button type="button" className="live-demo" onClick={handleDemo}>LIVE DEMO</button>
                    </div>
                </div>
                <div className="right-banner">
                    <img className="dinosaur-form-img" src="https://www.wufoo.com/wp-content/uploads/2019/10/wufoo-online-form-builder.png" alt="Dinosaurs building an html form"/>
                </div>
            </div>
            <nav className="contact-me-nav">

            </nav>
        </div>
    )
}

export default SplashPage;
