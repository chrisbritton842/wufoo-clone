import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Redirect } from "react-router-dom";
import { login } from '../../store/session';
import './SplashPage.css';

const SplashPage = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    let history = useHistory();

    function handleSignUp() {
        history.push('/signup');
    };

    function handleLogin() {
        history.push('/login');
    };

    const handleDemo = (e) => {
        e.preventDefault();
        dispatch(login('demo@aa.io', 'password'));
    };

    const handleGithub = () => {
        window.location.href = "https://github.com/chrisbritton842";
        return null;
    };

    const handleLinkedin = () => {
        window.location.href = "https://www.linkedin.com/in/christopher-britton-3b94a2123/";
        return null;
    };

    if (user) {
        return <Redirect to={`/forms/${user.id}`} />;
    }

    return (
        <div className="splash-wrapper">
            <div className="header-bar">
                <div className="nav-container">
                    <div className="svg-logo">
                        <img className="rare-form-logo" src="../../../../static/splash_form.png" alt="Logo for RareForm website" style={{height: "50px"}}></img>
                    </div>
                    <div className="nav-btns">
                        <button type="button" className="top-sign-up" onClick={handleSignUp}>SIGN UP</button>
                        <button type="button" className="top-login" onClick={handleLogin}>LOGIN</button>
                    </div>
                </div>
            </div>
            <div className="banner-container">
                <div className="left-banner">
                    <h1 className="banner-h1">Easy-to-Use Online Form Builder For Every Organization</h1>
                    <p>A form builder that makes it easy to create registration forms, application forms, surveys, contact forms and more.</p>
                    <div className="banner-btn-row">
                        <button type="button" className="sign-up-free" onClick={handleSignUp}>SIGN UP FREE</button>
                        <button type="button" className="live-demo" onClick={handleDemo}>LIVE DEMO</button>
                    </div>
                </div>
                {/* <div className="right-banner"> */}
                    <img className="dinosaur-form-img" src="https://www.wufoo.com/wp-content/uploads/2019/10/wufoo-online-form-builder.png" alt="Dinosaurs building an html form"/>
                {/* </div> */}
            </div>
            <footer>
                <img className="github-icon" src="../../../../static/github.png" alt="Logo for Github website" style={{height: "50px"}} onClick={handleGithub}></img>
                <img className="linkedin-icon" src="../../../../static/linkedin.png" alt="Logo for LinkedIn website" style={{height: "50px"}} onClick={handleLinkedin}></img>
            </footer>
        </div>
    )
}

export default SplashPage;
