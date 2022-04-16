import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import './BuildForm.css'

const BuildForm = () => {
    const dispatch = useDispatch();
    const [inputs, setInputs] = useState([]);
    const [labels, setLabels] = useState([]);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
    const [selectedInputType, setSelectedInputType] = useState(null);
    const [selectedFieldLabel, setSelectedFieldLabel] = useState('');

    const typeName = (type) => {
        if (type === 1) return "Single Line Text";
        else if (type === 2) return "Paragraph Text";
        else if (type === 3) return "Number";
        else if (type === 4) return "Url";
        else if (type === 5) return "Email";
        else if (type === 6) return "Phone";
        else if (type === 7) return "Date";
        else return "";
    };


    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    const handleText = () => {
        setInputs((inputs) => [...inputs, 1, ]);
        setLabels((labels) => [...labels, "Untitled"]);
    };

    const handleParagraph = () => {
        setInputs((inputs) => [...inputs, 2, ]);
        setLabels((labels) => [...labels, "Untitled"]);
    };

    const handleNumber = () => {
        setInputs((inputs) => [...inputs, 3, ]);
        setLabels((labels) => [...labels, "Number"]);
    };

    const handleUrl = () => {
        setInputs((inputs) => [...inputs, 4, ]);
        setLabels((labels) => [...labels, "Url"]);
    };

    const handleEmail = () => {
        setInputs((inputs) => [...inputs, 5, ]);
        setLabels((labels) => [...labels, "Email"]);
    };

    const handleTelephone = () => {
        setInputs((inputs) => [...inputs, 6, ]);
        setLabels((labels) => [...labels, "Phone Number"]);
    };

    const handleDate = () => {
        setInputs((inputs) => [...inputs, 7, ]);
        setLabels((labels) => [...labels, "Date"]);
    };

    const handleFieldSelect = (e) => {
        e.preventDefault();
        const index = parseInt(e.target.id, 10);
        const currentType = inputs[index];
        const name = labels[index];
        setSelectedFieldIndex(index);
        setSelectedInputType(currentType);
        setSelectedFieldLabel(name);
        setShowEdit(true);
    };

    const handleEdit = () => {

    }

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
                        {!showEdit && (
                            <>
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
                            </>
                        )}
                        {showEdit && (
                            <>
                                <div>
                                    <label for="label-edit-field">Field Label</label>
                                    <textarea id="label-edit-field" value={selectedFieldLabel} onChange={e => setSelectedFieldLabel(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <label for="type-select">Field Type</label>
                                    <select id="type-select" value={selectedInputType} onChange={e => setSelectedInputType(e.target.value)}>
                                        <option value={1}>Single Line Text</option>
                                        <option value={2}>Paragraph Text</option>
                                        <option value={3}>Number</option>
                                        <option value={4}>Url</option>
                                        <option value={5}>Email</option>
                                        <option value={6}>Phone</option>
                                        <option value={7}>Date</option>
                                    </select>

                                </div>
                                <div>
                                    <button type="button" onClick={handleEdit}>Edit</button>
                                    <button type="button" onClick={handleDelete}>Delete</button>
                                </div>
                            </>
                        )}
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
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="text" onClick={handleFieldSelect}></input>
                                            </div>
                                        )}
                                        {input === 2 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <textarea id={`${idx}`} onClick={handleFieldSelect}></textarea>
                                            </div>
                                        )}
                                        {input === 3 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="number" onClick={handleFieldSelect}></input>
                                            </div>
                                        )}
                                        {input === 4 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="url" onClick={handleFieldSelect}></input>
                                            </div>
                                        )}
                                        {input === 5 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="email" onClick={handleFieldSelect}></input>
                                            </div>
                                        )}
                                        {input === 6 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="telephone" onClick={handleFieldSelect}></input>
                                            </div>
                                        )}
                                        {input === 7 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="date" onClick={handleFieldSelect}></input>
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
