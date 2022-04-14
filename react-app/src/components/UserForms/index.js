import React from 'react';
import { Link } from 'react-router-dom';

const UserForms = () => {
    return (
        <div className="user-forms-wrapper">
            <header className="user-forms-header">
                <Link to="/">

                </Link>
                <div className="drop-down-div">
                    <div className="avatar-circle-div">

                    </div>
                    <div className="username-div">

                    </div>
                    <div className="dropdown-arrow-div">

                    </div>
                </div>
            </header>
            <div className="top-band">
                <div className="h1-div">
                    <h1>Forms</h1>
                </div>
                <div className="create-btn-div">
                    <button className="create-form">
                        Create Form
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UserForms;
