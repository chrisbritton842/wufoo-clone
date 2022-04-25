import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as formActions from '../../store/forms';
import * as entryActions from '../../store/entries';
import './ViewForm.css'

const ViewForm = () => {
    let { formId, userId } = useParams();
    const parsedFormId = parseInt(formId, 10);
    const forms = useSelector((state) => state.forms.forms);
    const user = useSelector((state) => state.session.user);
    const userForm = forms?.find(form => form.id === parsedFormId);
    const dispatch = useDispatch();
    const history = useHistory();
    const inputs = userForm?.field_type;
    const labels = userForm?.field_labels;
    const title = userForm?.title;
    const description = userForm?.input_labels;
    const [date, setDate] = useState({});
    const [email, setEmail] = useState({});
    const [number, setNumber] = useState({});
    const [telephone, setTelephone] = useState({});
    const [text, setText] = useState({});
    const [textArea, setTextArea] = useState({});
    const [url, setUrl] = useState({});

    const handleSubmitForm = () => {
        dispatch(entryActions.createEntry(date, email, number, telephone, text, textArea, url, formId));
        console.log("USER: ", user)
        if (user) return history.push(`/entry-manager/${formId}`);
        history.push('/endpage');
    };

    const handleDateInput = (e) => {
        setDate({...date, [e.target.dataset.label]: e.target.value});
    };

    const handleEmailInput = (e) => {
        setEmail({...email, [e.target.dataset.label]: e.target.value});
    };

    const handleNumberInput = (e) => {
        setNumber({...number, [e.target.dataset.label]: e.target.value});
    };

    const handleTelephoneInput = (e) => {
        setTelephone({...telephone, [e.target.dataset.label]: e.target.value});
    };

    const handleTextInput = (e) => {
        setText({...text, [e.target.dataset.label]: e.target.value});
    };

    const handleTextAreaInput = (e) => {
        setTextArea({...textArea, [e.target.dataset.label]: e.target.value});
    };

    const handleUrlInput = (e) => {
        setUrl({...url, [e.target.dataset.label]: e.target.value});
    };

    useEffect(() => {
        dispatch(formActions.getForms(userId))
    }, [dispatch, userId]);

    const handleLogo = () => {
        history.push('/');
    };

    return (
        <div className="build-form-wrapper">
            <div className="build-container">
                <div className="view-form-stage">
                    <div className="view-form-main">
                        <div className="form-view-logo-div">
                            <div className="svg-view-logo">
                                <img className="view-rare-form-logo" src="../../../../static/view_form.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
                            </div>
                        </div>
                        <div className="view-form-info-div">
                            <h2 className="view-form-title">{title}</h2>
                            <div className='view-form-description'>{description}</div>
                        </div>
                        <div className="form-inputs">
                            {inputs?.map((input, idx) => {
                                return (
                                    <>
                                        {input === 1 && (
                                            <div className="view-form-text-div">
                                                <label className="view-form-text-label" for={`${idx}`}>{labels[idx]}</label>
                                                <input className="view-form-text-input" id={`${idx}`} type="text" data-label={labels[idx]} value={text[labels[idx]]} onChange={handleTextInput}></input>
                                            </div>
                                        )}
                                        {input === 2 && (
                                            <div className="view-form-textarea-div">
                                                <label className="view-form-textarea-label" for={`${idx}`}>{labels[idx]}</label>
                                                <textarea className="view-form-textarea-input" id={`${idx}`} data-label={labels[idx]} value={textArea[labels[idx]]} onChange={handleTextAreaInput}></textarea>
                                            </div>
                                        )}
                                        {input === 3 && (
                                            <div className="view-form-number-div">
                                                <label className="view-form-number-label" for={`${idx}`}>{labels[idx]}</label>
                                                <input className="view-form-number-input" id={`${idx}`} type="number" data-label={labels[idx]} value={number[labels[idx]]} onChange={handleNumberInput}></input>
                                            </div>
                                        )}
                                        {input === 4 && (
                                            <div className="view-form-url-div">
                                                <label className="view-form-url-label" for={`${idx}`}>{labels[idx]}</label>
                                                <input className="view-form-url-input" id={`${idx}`} type="url" data-label={labels[idx]} value={url[labels[idx]]} onChange={handleUrlInput}></input>
                                            </div>
                                        )}
                                        {input === 5 && (
                                            <div className="view-form-email-div">
                                                <label className="view-form-email-label" for={`${idx}`}>{labels[idx]}</label>
                                                <input className="view-form-email-input" id={`${idx}`} type="email" data-label={labels[idx]} value={email[labels[idx]]} onChange={handleEmailInput}></input>
                                            </div>
                                        )}
                                        {input === 6 && (
                                            <div className="view-form-phone-div">
                                                <label className="view-form-phone-label" for={`${idx}`}>{labels[idx]}</label>
                                                <input className="view-form-phone-input" id={`${idx}`} type="telephone" data-label={labels[idx]} value={telephone[labels[idx]]} onChange={handleTelephoneInput}></input>
                                            </div>
                                        )}
                                        {input === 7 && (
                                            <div className="view-form-date-div">
                                                <label className="view-form-date-label" for={`${idx}`}>{labels[idx]}</label>
                                                <input className="view-form-date-input" id={`${idx}`} type="date" data-label={labels[idx]} value={date[labels[idx]]} onChange={handleDateInput}></input>
                                            </div>
                                        )}
                                    </>
                                )
                            })}
                        </div>
                        <div className="view-form-submit-btn-div">
                            <button className="view-form-submit-btn" type="submit" onClick={handleSubmitForm}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewForm;
