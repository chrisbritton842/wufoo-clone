import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import * as formActions from '../../store/forms';
import { ReactComponent as LinkIcon } from './link.svg';
import './ShareForm.css';

const SharePage = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    let { formId, userId } = useParams();
    const parsedFormId = parseInt(formId, 10);
    const user = useSelector((state) => state.session.user);
    const forms = useSelector((state) => state.forms.forms);
    const userForm = forms?.find(form => form.id === parsedFormId);

    console.log('User ID: ', userId)

    const handleLogout = () => {
        dispatch(sessionActions.logout());
    };

    useEffect(() => {
        return dispatch(formActions.getForms(user.id))
    }, [dispatch, user]);

    const handleLogo = () => {
        history.push('/');
    };

    return (
        <div className="share-form-wrapper">
            <nav className="user-forms-header">
                <ul id="menu">
                    <li className="logo-li">
                        <div className="svg-logo">
                            <img className="rare-form-logo-user-forms" src="../../../../static/signup.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
                        </div>
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
            <div className="top-share-band">
                <div className="h1-share-div">
                    <h1 className="share-title">{userForm?.title}</h1>
                </div>
            </div>
            <div className="share-link-area">
                <h2 className="share-a-link">Share a link to your form</h2>
                <div className="main-link-div">
                    <div className="share-link">
                        <LinkIcon className="link-icon"/>
                        <input className="url-share" type="url" value={`${window.location.origin}/form/${formId}/${userId}`}></input>
                        <button className="share-url-copy" type="button" data-url={`${window.location.origin}/form/${formId}/${userId}`} onClick={e => navigator.clipboard.writeText(e.target.dataset.url)}>COPY</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SharePage;
