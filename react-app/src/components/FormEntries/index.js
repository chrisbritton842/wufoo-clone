import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/forms';
import './FormEntries.css';

const FormEntries = () => {
    let history = useHistory();
    let { formId } = useParams();
    const parsedFormId = parseInt(formId, 10);
    const forms = useSelector((state) => state.forms.forms);
    const user = useSelector((state) => state.session.user);
    const userForm = forms?.find(form => form.id === parsedFormId);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    useEffect(() => {
        dispatch(formActions.getForms(user.id))
    }, [dispatch, user]);

    const handleLogo = () => {
        history.push('/');
    };

    return (
        <div className="form-entries-wrapper">
            <nav className="user-forms-header">
                <ul id="menu">
                    <li className="logo-li">
                        <div className="svg-logo">
                            <img className="rare-form-logo-user-forms" src="../../../../static/signup.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
                        </div>
                    </li>
                    <li>
                        <label className="user-forms-username" for="check">{user.username}</label>
                        <input id="check" type="checkbox" name="menu" />
                        <ul class="submenu">
                            <li>
                                <div className="logout-div" onClick={handleLogout}>Logout</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
            <div className="top-band">
                <div className="form-entries-h1-div">
                    <h1 className="form-entries-h1">{`${userForm ? userForm.title : "Form"} Entries`}</h1>
                </div>
            </div>
            <div className="form-entries-area">
                <div className="form-entries-grid">
                    <div className="entries-table-div">
                        <table className="form-entries-table">
                            <thead className="form-entries-thead">
                                <tr className="form-entries-thead-tr">
                                    <th className="form-entries-id-th">
                                        <div>ID</div>
                                    </th>
                                    <th className="form-entries-middle-th">
                                        <div>CREATED AT</div>
                                    </th>
                                    {userForm?.field_labels.map(label => (
                                        <th className="form-entries-middle-th">
                                            <div>{label.toUpperCase()}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="form-entries-tbody">
                                {userForm?.entries.map(entry => (
                                    <tr className="form-entries-body-tr">
                                        <td className="form-entries-td-id">
                                            <div>{entry.id}</div>
                                        </td>
                                        <td className="form-entries-td-created-at">
                                            <div>{(new Date(entry.created_at)).toLocaleString()}</div>
                                        </td>
                                        {userForm.field_type.map((type, idx) => (
                                            <>
                                                {type === 1 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.text[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 2 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.textarea[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 3 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.number[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 4 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.url[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 5 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.email[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 6 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.telephone[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 7 && (
                                                    <td className="form-entries-td">
                                                        <div>{entry.date[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                            </>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEntries;
