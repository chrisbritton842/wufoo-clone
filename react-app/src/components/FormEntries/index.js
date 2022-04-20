import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/forms';

const FormEntries = () => {
    let { formId } = useParams();
    const parsedFormId = parseInt(formId, 10);
    const forms = useSelector((state) => state.forms.forms);
    console.log("Forms: ", forms)
    const user = useSelector((state) => state.session.user);
    console.log("ParsedId: ", parsedFormId)
    const userForm = forms?.find(form => form.id === parsedFormId);
    const dispatch = useDispatch();
    console.log("Form: ", userForm);

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    useEffect(() => {
        dispatch(formActions.getForms(user.id))
    }, [dispatch, user]);

    return (
        <div className="form-entries-wrapper">
            <nav className="user-forms-header">
                <ul id="menu">
                    <li className="logo-li">
                        <Link to="/">

                        </Link>
                    </li>
                    <li>
                        <div className="avatar-circle-div">

                        </div>
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
                <div className="h1-div">
                    <h1>{`${userForm ? userForm.title : "Form"} Entries`}</h1>
                </div>
            </div>
            <div className="form-entries-area">
                <div className="form-entries-grid">
                    <div className="entries-utility-bar">

                    </div>
                    <div className="entries-table-div">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div>ID</div>
                                    </th>
                                    <th>
                                        <div>CREATED AT</div>
                                    </th>
                                    {userForm.field_labels.map(label => (
                                        <th>
                                            <div>{label.toUpperCase()}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {userForm.entries.map(entry => (
                                    <tr>
                                        <td>
                                            <div>{entry.id}</div>
                                        </td>
                                        <td>
                                            <div>{(new Date(entry.created_at)).toLocaleString()}</div>
                                        </td>
                                        {userForm.field_type.map((type, idx) => (
                                            <>
                                                {type === 1 && (
                                                    <td>
                                                        <div>{entry.text[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 2 && (
                                                    <td>
                                                        <div>{entry.textarea[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 3 && (
                                                    <td>
                                                        <div>{entry.number[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 4 && (
                                                    <td>
                                                        <div>{entry.url[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 5 && (
                                                    <td>
                                                        <div>{entry.email[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 6 && (
                                                    <td>
                                                        <div>{entry.telephone[userForm.field_labels[idx]]}</div>
                                                    </td>
                                                )}
                                                {type === 7 && (
                                                    <td>
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
