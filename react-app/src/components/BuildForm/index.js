import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { createForm } from '../../store/forms';
import './BuildForm.css'

const BuildForm = () => {
    const user = useSelector((state) => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();
    const [inputs, setInputs] = useState([]);
    const [labels, setLabels] = useState([]);
    const [title, setTitle] = useState('Untitled Form');
    const [description, setDescription] = useState("This is my form. Please fill it out. It's awesome!")
    const [displayedPanel, setDisplayedPanel] = useState('a');
    const [selectedFieldIndex, setSelectedFieldIndex] = useState(null);
    const [selectedInputType, setSelectedInputType] = useState(null);
    const [selectedFieldLabel, setSelectedFieldLabel] = useState('');

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
        setDisplayedPanel('b');
    };

    const handleEdit = () => {
        setInputs((inputs) => {
            return [
                ...inputs.slice(0, selectedFieldIndex),
                parseInt(selectedInputType, 10),
                ...inputs.slice(selectedFieldIndex + 1),
            ]
        });

        setLabels((labels) => {
            return [
                ...labels.slice(0, selectedFieldIndex),
                selectedFieldLabel,
                ...labels.slice(selectedFieldIndex + 1),
            ]
        });

        setDisplayedPanel('a');
    };

    const handleDelete = () => {
        setInputs((inputs) => {
            return [
                ...inputs.slice(0, selectedFieldIndex),
                0,
                ...inputs.slice(selectedFieldIndex + 1),
            ]
        });

        setLabels((labels) => {
            return [
                ...labels.slice(0, selectedFieldIndex),
                "",
                ...labels.slice(selectedFieldIndex + 1),
            ]
        });

        setDisplayedPanel('a');
    };

    const handleSaveForm = () => {
        dispatch(createForm(title, inputs, labels, description, user.id));
        history.push(`/forms/${user.id}`)
    };

    const handleLogo = () => {
        history.push('/');
    };

    return (
        <div className="build-form-wrapper">
            <div className="build-container">
                <div className="nav-div">
                    <ul id="build-menu">
                        <li className="build-menu-li">
                            <div className="svg-logo">
                                <img className="rare-form-logo-user-forms" src="/signup.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
                            </div>
                        </li>
                        <li className="build-menu-li">
                            <label className="build-form-label" for="check">{user.username}</label>
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
                        {displayedPanel === 'a' && (
                            <div className="create-a">
                                <h3>Standard</h3>
                                <ul className="left-input-col">
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleText}>Single Line Text</button>
                                    </li>
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleParagraph}>Paragraph Text</button>
                                    </li>
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleNumber}>Number</button>
                                    </li>
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleUrl}>Url</button>
                                    </li>
                                </ul>
                                <ul className="right-input-col">
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleEmail}>Email</button>
                                    </li>
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleTelephone}>Phone</button>
                                    </li>
                                    <li className="create-li">
                                        <button className="create-input-btn" type="button" onClick={handleDate}>Date</button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        {displayedPanel === 'b' && (
                            <div className="create-b">
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
                            </div>
                        )}
                        {displayedPanel === 'c' && (
                            <div className="create-c">
                                <div>
                                    <label for="title-edit-field">Form Title</label>
                                    <input id="title-edit-field" type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                                </div>
                                <div>
                                    <label for="description-edit-field">Description</label>
                                    <textarea id="description-edit-field" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <button type="button" onClick={() => setDisplayedPanel('a')}>Done</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="form-main">
                        <div className="form-info-div" onClick={() => setDisplayedPanel('c')}>
                            <h2>{title}</h2>
                            <div>{description}</div>
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
                        <div className="bottom-buttons">
                            <span className="left-btns">
                                <button type="button" onClick={handleSaveForm}>Save Form</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <footer></footer>

        </div>
    )
}

export default BuildForm;
