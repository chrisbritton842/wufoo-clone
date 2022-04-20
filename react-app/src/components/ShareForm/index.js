import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/forms';
import { ReactComponent as LinkIcon } from './link.svg';

const SharePage = () => {
    const dispatch = useDispatch();
    let { formId } = useParams();
    console.log("Location", window.location.origin)
    const parsedFormId = parseInt(formId, 10);
    const user = useSelector((state) => state.session.user);
    const forms = useSelector((state) => state.forms.forms);
    console.log("Forms: ", forms)
    const userForm = forms?.find(form => form.id === parsedFormId);

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    useEffect(() => {
        return dispatch(formActions.getForms(user.id))
    }, [dispatch, user]);

    return (
        <div className="share-form-wrapper">
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
                    <h1>{userForm?.title}</h1>
                </div>
            </div>
            <div className="share-link-area">
                <h2>Share a link to your form</h2>
                <div className="main-link-div">
                    <div className="share-link">
                        <LinkIcon style={{height: '15px'}}/>
                        <input type="url" value={`${window.location.origin}/form/${formId}`}></input>
                        <button type="button" data-url={`${window.location.origin}/form/${formId}`} onClick={e => navigator.clipboard.writeText(e.target.dataset.url)}>COPY</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SharePage;
