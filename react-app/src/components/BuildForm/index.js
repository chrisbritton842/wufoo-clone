import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './BuildForm.css'

const BuildForm = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState([]);
    console.log('Inputs', inputs)

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    const handleText = () => {
        setInputs((inputs) => [...inputs, 1, ]);
    };

    const handleParagraph = () => {
        setInputs((inputs) => [...inputs, 2, ]);
    };

    const handleNumber = () => {
        setInputs((inputs) => [...inputs, 3, ]);
    };

    const handleUrl = () => {
        setInputs((inputs) => [...inputs, 4, ]);
    };

    const handleEmail = () => {
        setInputs((inputs) => [...inputs, 5, ]);
    };

    const handleTelephone = () => {
        setInputs((inputs) => [...inputs, 6, ]);
    };

    const handleDate = () => {
        setInputs((inputs) => [...inputs, 7, ]);
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
                                <button type="button" onClick={handleText}>Single Line Text</button>
                            </li>
                            <li className="paragraph-li">
                                <button type="button" onClick={handleParagraph}>Paragraph Text</button>
                            </li>
                            <li className="number-li">
                                <button type="button" onClick={handleNumber}>Number</button>
                            </li>
                            <li className="url-li">
                                <button type="button" onClick={handleUrl}>Url</button>
                            </li>
                        </ul>
                        <ul className="right-input-col">
                            <li className="email-li">
                                <button type="button" onClick={handleEmail}>Email</button>
                            </li>
                            <li className="telephone-li">
                                <button type="button" onClick={handleTelephone}>Phone</button>
                            </li>
                            <li className="date-li">
                                <button type="button" onClick={handleDate}>Date</button>
                            </li>
                        </ul>
                    </div>
                    <div className="form-main">
                        <div className="form-info-div">
                            <h2>Untitled Form</h2>
                            <div></div>
                        </div>
                        <div className="form-inputs">
                            {inputs.map((input, idx) => {
                                return (
                                    <>
                                        {input === 1 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <input id={`${idx}`} type="text"></input>
                                            </div>
                                        )}
                                        {input === 2 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <textarea id={`${idx}`}></textarea>
                                            </div>
                                        )}
                                        {input === 3 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <input id={`${idx}`} type="number"></input>
                                            </div>
                                        )}
                                        {input === 4 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <input id={`${idx}`} type="url"></input>
                                            </div>
                                        )}
                                        {input === 5 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <input id={`${idx}`} type="email"></input>
                                            </div>
                                        )}
                                        {input === 6 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <input id={`${idx}`} type="telephone"></input>
                                            </div>
                                        )}
                                        {input === 7 && (
                                            <div>
                                                <label for={`${idx}`}></label>
                                                <input id={`${idx}`} type="date"></input>
                                            </div>
                                        )}
                                    </>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <footer></footer>

        </div>
    )
}

export default BuildForm;
