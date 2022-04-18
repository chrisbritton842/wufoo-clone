import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/forms';
import './UserForms.css'

const UserForms = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const forms = useSelector((state) => state.forms.forms);

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
                                                    <b>{form.title}</b>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="all-entries-cell-div">

                                                </div>
                                            </td>
                                            <td>
                                                <div className="share-cell-div">

                                                </div>
                                            </td>
                                            <td>
                                                <div className="more-cell-div">

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
