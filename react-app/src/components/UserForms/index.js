import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/forms';
import { ReactComponent as EntriesIcon } from './entries.svg';
import { ReactComponent as ShareIcon } from './share.svg';
import { ReactComponent as MoreIcon } from './more.svg';
import { ReactComponent as ViewIcon } from './view.svg';
import { ReactComponent as EditIcon } from './edit.svg';
import { ReactComponent as DeleteIcon } from './delete.svg';
import './UserForms.css'

const UserForms = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const forms = useSelector((state) => state.forms.forms);
    const [showTitleEdit, setShowTitleEdit] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [selectedFormId, setSelectedFormId] = useState(null);

    let history = useHistory();

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    function handleCreateForm() {
        history.push(`/build/${user.id}`);
    };

    useEffect(() => {
        return dispatch(formActions.getForms(user.id))
    }, [dispatch, user]);

    const handleTitleEdit = (e) => {
        const formId = parseInt(e.target.id, 10);
        const userForm = forms.find(form => form.id === formId);
        const title = userForm.title;
        setEditedTitle(title);
        setSelectedFormId(formId);
        setShowTitleEdit(true);
    };

    const editTitle = (e) => {
        if (e.code === 'Enter') {
            e.preventDefault();
            dispatch(formActions.updateFormTitle(editedTitle, selectedFormId, user.id));
            setShowTitleEdit(false);
        }
    };

    const handleShare = (e) => {
        const formId = parseInt(e.target.dataset.formId);
        history.push(`/forms/${formId}/share`)
    };

    const handleView = (e) => {
        const formId = parseInt(e.target.dataset.formId);
        history.push(`/form/${formId}`);
    };

    const handleEdit = (e) => {
        const formId = parseInt(e.target.dataset.formId);
        history.push(`/edit/${formId}`);
    };

    const handleDelete = (e) => {
        const formId = parseInt(e.target.dataset.formId);
        dispatch(formActions.deleteForm(user.id, formId));
    };


    return (
        <div className="user-forms-wrapper">
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
                    <h1>Forms</h1>
                </div>
                <div className="create-btn-div">
                    <button type="button" className="create-form" onClick={handleCreateForm}>
                        Create Form
                    </button>
                </div>
            </div>
            <div className="user-forms-area">
                <div className="user-forms-grid">
                    <div className="forms-utility-bar">

                    </div>
                    <div className="forms-table-div">
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        <div>Name</div>
                                    </th>
                                    <th>
                                        <div>All Entries</div>
                                    </th>
                                    <th>
                                        <div>Share</div>
                                    </th>
                                    <th>
                                        <div>More</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {forms?.map((form) => {
                                    return (
                                        <tr>
                                            <td>
                                                <div className="title-cell-div">
                                                    {showTitleEdit && selectedFormId === form.id && (
                                                        <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} onKeyUp={editTitle}></input>
                                                    )}
                                                    {!(showTitleEdit && selectedFormId === form.id) && (
                                                        <b>{form.title}</b>
                                                    )}
                                                    <div className="form-information">
                                                        <span id={`${form.id}`} onClick={e => handleTitleEdit(e)}>Edit Title</span>
                                                        <div className="recent-entry-date">
                                                            Recent entry:
                                                            <span></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="all-entries-cell-div">
                                                    <span>
                                                        <span></span>
                                                        <EntriesIcon />
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="share-cell-div">
                                                    <span>
                                                        <ShareIcon data-form-id={`${form.id}`} onClick={handleShare}/>
                                                    </span>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="more-cell-div">
                                                    <span>
                                                        <MoreIcon />
                                                    </span>
                                                    <ul class="more-icon-submenu">
                                                        <li>
                                                            <section className="submenu-view-form-div" data-form-id={`${form.id}`}>
                                                                <ViewIcon />
                                                                <span data-form-id={`${form.id}`} onClick={handleView}>View form</span>
                                                            </section>
                                                        </li>
                                                        <li>
                                                            <section className="submenu-edit-form-div">
                                                                <EditIcon />
                                                                <span data-form-id={`${form.id}`} onClick={handleEdit}>Edit form</span>
                                                            </section>
                                                        </li>
                                                        <li>
                                                            <section className="submenu-delete-form-div">
                                                                <DeleteIcon />
                                                                <span data-form-id={`${form.id}`} onClick={handleDelete}>Delete form</span>
                                                            </section>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserForms;
