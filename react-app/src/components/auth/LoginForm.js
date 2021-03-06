import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login, signUp } from '../../store/session';
import './LoginForm.css';

const LoginForm = () => {
  let history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [showSignup, setShowSignup] = useState(false)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let validEmail;
  let validPassword;
  let validUsername;

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (validEmail && validPassword && validUsername) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSignUpRadio = (e) => {
    e.preventDefault()
    setShowSignup(true)
  }

  const handleLoginRadio = (e) => {
    e.preventDefault()
    setShowSignup(false)
  }

  const eRegex = new RegExp(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);

  if (eRegex.test(email)) {
    validEmail = true;
  };

  const pRegex = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{7,}$/);

  if (pRegex.test(password)) {
    validPassword = true;
  };

  const uRegex = new RegExp(/[a-zA-Z0-9]/);

  if (uRegex.test(username)) {
    validUsername = true;
  };

  if (user) {
    return <Redirect to={`/forms/${user.id}`} />;
  }

  const handleLogo = () => {
    history.push('/');
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <nav className="login-nav">
          <div className="svg-logo">
              <img className="rare-form-logo-signup" src="../../../../static/signup.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
          </div>
        </nav>
        <section className="title-block">
          <h1 className="login-title">Welcome to RareForm!</h1>
          <h3 className="login-paragraph">Create an account or log in</h3>
        </section>
        <section className="login-form-parent">
          {!showSignup && (
            <form className="login-login-form" onSubmit={onLogin}>
              <div>
                {errors.find(e => e.includes('email')) && (
                  <span className="error-handling">{errors.find(e => e.includes('email')).slice(8)}</span>
                )}
                <input
                  className='login-email-input'
                  name='email'
                  type='email'
                  placeholder='EMAIL ADDRESS'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className="radio-btn-div">
                <span className="sign-up-span">
                  <input className="login-radio-input" type="radio" checked={false} onChange={handleSignUpRadio}/>
                  Sign up for a free account
                </span>
                <span className="login-span">
                  <input className="login-radio-input" type="radio" checked={true} onChange={handleLoginRadio}/>
                  Login to my account
                </span>
              </div>
              <div className="password-input-div">
                {errors.find(e => e.includes('password')) && (
                  <span className="error-handling">{errors.find(e => e.includes('password')).slice(11)}</span>
                )}
                <input
                  className='login-password-input'
                  name='password'
                  type='password'
                  placeholder='PASSWORD'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className="confirm-btn-div">
                <button className="login-confirm-button" type='submit'>CONFIRM</button>
              </div>
            </form>
          )}
          {showSignup && (
            <form className="login-signup-form" onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind} className="error-handling">{error}</div>
                ))}
              </div>
              <div>
                {!validEmail && (
                  <span className="error-handling">Your valid email</span>
                )}
                <input
                  className='login-email-input'
                  name='email'
                  type='email'
                  placeholder='EMAIL ADDRESS'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className="radio-btn-div">
                <span className="sign-up-span">
                  <input className="login-radio-input" type="radio" checked={true} onChange={handleSignUpRadio}/>
                  Sign up for a free account
                </span>
                <span className="login-span">
                  <input type="radio" checked={false} onChange={handleLoginRadio}/>
                  Login to my account
                </span>
              </div>
              <div className="password-input-div">
                {!validPassword && (
                  <span className="error-handling">At least 7 characters with one letter and number</span>
                )}
                <input
                  className='login-password-input'
                  name='password'
                  type='password'
                  placeholder='PASSWORD'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className="username-input-div">
                {!validUsername && (
                    <span className="error-handling">Letters and numbers only please</span>
                )}
                <input
                  className='login-username-input'
                  name='username'
                  type='text'
                  placeholder='USERNAME'
                  value={username}
                  onChange={updateUsername}
                />
              </div>
              <div className="sign-up-btn-div">
                <button className="login-confirm-button" type='submit'>SIGN UP</button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};

export default LoginForm;
