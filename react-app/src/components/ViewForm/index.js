import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import * as formActions from '../../store/forms'
import './ViewForm.css'

const ViewForm = () => {
    let { formId } = useParams();
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

    console.log("Email: ", email)
    console.log("Url: ", url)

    const handleSubmitForm = () => {

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
        return dispatch(formActions.getForms(user.id))
    }, [dispatch, user]);

    return (
        <div className="build-form-wrapper">
            <div className="build-container">
                <div className="form-stage">
                    <div className="form-main">
                        <div className="form-info-div">
                            <h2>{title}</h2>
                            <div>{description}</div>
                        </div>
                        <div className="form-inputs">
                            {inputs?.map((input, idx) => {
                                return (
                                    <>
                                        {input === 1 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="text" data-label={labels[idx]} value={text[labels[idx]]} onChange={handleTextInput}></input>
                                            </div>
                                        )}
                                        {input === 2 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <textarea id={`${idx}`} data-label={labels[idx]} value={textArea[labels[idx]]} onChange={handleTextAreaInput}></textarea>
                                            </div>
                                        )}
                                        {input === 3 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="number" data-label={labels[idx]} value={number[labels[idx]]} onChange={handleNumberInput}></input>
                                            </div>
                                        )}
                                        {input === 4 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="url" data-label={labels[idx]} value={url[labels[idx]]} onChange={handleUrlInput}></input>
                                            </div>
                                        )}
                                        {input === 5 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="email" data-label={labels[idx]} value={email[labels[idx]]} onChange={handleEmailInput}></input>
                                            </div>
                                        )}
                                        {input === 6 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="telephone" data-label={labels[idx]} value={telephone[labels[idx]]} onChange={handleTelephoneInput}></input>
                                            </div>
                                        )}
                                        {input === 7 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="date" data-label={labels[idx]} value={date[labels[idx]]} onChange={handleDateInput}></input>
                                            </div>
                                        )}
                                    </>
                                )
                            })}
                        </div>
                        <div className="submit-button">
                            <button type="submit" onClick={handleSubmitForm}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default ViewForm;
