import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './BuildForm.css'

const BuildForm = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    return (
        <div className="build-form-wrapper">
            <div className="build-container">
                <div className="nav-div">
                    <ul id="build-menu">
                        <li className="build-menu-li">
                            <Link to="/">

                            </Link>
                        </li>
                        <li className="build-menu-li">
                            <label className="build-form-label" for="check">Account</label>
                            <input id="check" type="checkbox" name="menu" />
                            <ul className="build-submenu">
                                <li>
                                    <div className="build-logout-div" onClick={handleLogout}>Logout</div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="form-stage">
                    <div className="left-side">
                        <h3>Standard</h3>
                        <ul className="left-input-col">
                            <li className="text-li">
                                <button type="button"></button>
                            </li>
                            <li className="paragraph-li">
                                <button type="button"></button>
                            </li>
                            <li className="number-li">
                                <button type="button"></button>
                            </li>
                            <li className="url-li">
                                <button type="button"></button>
                            </li>
                        </ul>
                        <ul className="right-input-col">
                            <li className="email-li">
                                <button type="button"></button>
                            </li>
                            <li className="telephone-li">
                                <button type="button"></button>
                            </li>
                            <li className="date-li">
                                <button type="button"></button>
                            </li>
                        </ul>
                    </div>
                    <div className="form-main">
                        <div className="form-info-div">
                            <h2>Untitled Form</h2>
                            <div></div>
                        </div>
                    </div>

                </div>
            </div>
            <footer></footer>

        </div>
    )
}

export default BuildForm;
