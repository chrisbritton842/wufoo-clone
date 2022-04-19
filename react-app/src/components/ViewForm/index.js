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

    const handleSubmitForm = () => {

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
                                                <input id={`${idx}`} type="text"></input>
                                            </div>
                                        )}
                                        {input === 2 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <textarea id={`${idx}`}></textarea>
                                            </div>
                                        )}
                                        {input === 3 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="number"></input>
                                            </div>
                                        )}
                                        {input === 4 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="url"></input>
                                            </div>
                                        )}
                                        {input === 5 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="email"></input>
                                            </div>
                                        )}
                                        {input === 6 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="telephone"></input>
                                            </div>
                                        )}
                                        {input === 7 && (
                                            <div>
                                                <label for={`${idx}`}>{labels[idx]}</label>
                                                <input id={`${idx}`} type="date"></input>
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
