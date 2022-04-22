import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
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
    const [showSubmenu, setShowSubmenu] = useState(false);
    const [selectedMenuFormId, setSelectedMenuFormId] = useState(null);

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

    const handleEntries = (e) => {
        const formId = parseInt(e.target.dataset.formId);
        history.push(`/entry-manager/${formId}`);
    }

    const handleShare = (e) => {
        const formId = parseInt(e.target.dataset.formId);
        history.push(`/forms/${formId}/share`);
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

    const handleLogo = () => {
        history.push('/');
    };

    const handleDropdown = (formId) => {
        setSelectedMenuFormId(formId);
        setShowSubmenu(!showSubmenu);
    };

    return (
        <div className="user-forms-wrapper">
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
                        <table className="user-forms-table">
                            <thead className="ufth">
                                <tr>
                                    <th className="uf-th">
                                        <div className="uf-th-name">Name</div>
                                    </th>
                                    <th className="uf-th">
                                        <div className="uf-th-all-entries">All Entries</div>
                                    </th>
                                    <th className="uf-th">
                                        <div className="uf-th-share">Share</div>
                                    </th>
                                    <th className="uf-th">
                                        <div className="uf-th-more">More</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="uf-tbody">
                                {forms?.map((form, i) => {
                                    return (
                                        <tr key={i} className="uf-body-tr">
                                            <td className="body-name">
                                                <div className="title-cell-div">
                                                    {showTitleEdit && selectedFormId === form.id && (
                                                        <input type="text" value={editedTitle} onChange={e => setEditedTitle(e.target.value)} onKeyUp={editTitle}></input>
                                                    )}
                                                    {!(showTitleEdit && selectedFormId === form.id) && (
                                                        <b>{form.title}</b>
                                                    )}
                                                    <div className="form-information">
                                                        <span id={`${form.id}`} className="form-edit-title" onClick={e => handleTitleEdit(e)}>Edit Title</span>
                                                        <div className="recent-entry-date">
                                                            <span>{`Recent entry:  ${form.entries.length ? form.entries[form.entries.length - 1].created_at : 'N/A'}`}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="entries-share-td">
                                                <div className="all-entries-cell-div">
                                                    <span className="all-entries-span">
                                                        <span>{form.entries.length}</span>
                                                        <EntriesIcon className="entries-icon" data-form-id={`${form.id}`} onClick={handleEntries} style={{height: '1.5em', width: '1.5em'}}/>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="entries-share-td">
                                                <div className="share-cell-div">
                                                    <span>
                                                        <ShareIcon data-form-id={`${form.id}`} onClick={handleShare} style={{height: '1.5em', width: '1.5em'}}/>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="more-td">
                                                <div className="more-cell-div">
                                                    <span>
                                                        <MoreIcon data-form-id={`${form.id}`} onClick={(e) => handleDropdown(e.target.dataset.formId)} style={{height: '1.5em', width: '1.5em'}}/>
                                                    </span>
                                                    {(showSubmenu && selectedMenuFormId === `${form.id}`) && (
                                                        <ul class="more-icon-submenu">
                                                            <li>
                                                                <section className="submenu-form-div" data-form-id={`${form.id}`}>
                                                                    <ViewIcon style={{height: '20px'}}/>
                                                                    <span data-form-id={`${form.id}`} onClick={handleView}>View form</span>
                                                                </section>
                                                            </li>
                                                            <li>
                                                                <section className="submenu-form-div">
                                                                    <EditIcon style={{height: '20px'}}/>
                                                                    <span data-form-id={`${form.id}`} onClick={handleEdit}>Edit form</span>
                                                                </section>
                                                            </li>
                                                            <li>
                                                                <section className="submenu-form-div">
                                                                    <DeleteIcon style={{height: '20px'}}/>
                                                                    <span data-form-id={`${form.id}`} onClick={handleDelete}>Delete form</span>
                                                                </section>
                                                            </li>
                                                        </ul>
                                                    )}
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
