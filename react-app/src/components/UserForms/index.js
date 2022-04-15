import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './UserForms.css'

const UserForms = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    let history = useHistory();

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    function handleCreateForm() {
        history.push(`/build/${user.id}`);
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
        </div>
    )
}

export default UserForms;
