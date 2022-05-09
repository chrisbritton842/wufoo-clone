import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let history = useHistory();
  let validEmail;
  let validPassword;
  let validUsername;

  const onSignUp = async (e) => {
    e.preventDefault();
    if (validEmail && validPassword && validUsername) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        console.log("DATA: ", data)
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (email.includes('@')) {
    validEmail = true;
  };

  const pRegex = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z]).{7,}$/);

  if (pRegex.test(password)) {
    validPassword = true;
  };

  const uRegex = new RegExp(/[a-zA-Z0-9]/)

  if (uRegex.test(username)) {
    validUsername = true;
  };



  if (user) {
    return <Redirect to={`/forms/${user.id}`} />;
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleLogo = () => {
    history.push('/');
  };

  return (
    <div className="signup-wrapper">
      <nav className="signup-nav-1">
        <ul id="menu">
          <li className="logo-li">
              <div className="svg-logo">
                  <img className="rare-form-logo-signup" src="../../../../static/signup.png" alt="Logo for RareForm website" style={{height: "50px"}} onClick={handleLogo}></img>
              </div>
          </li>
          <li>
            <button className="signup-login" type="button" onClick={handleLogin}>LOGIN</button>
          </li>
        </ul>
      </nav>
      <section className="heading">
        <h1 className="powerful-forms">Create powerful forms today.</h1>
      </section>
      <div className="row">
        <div className="left-column">
          <div className="signup-form-container">
            <form className="signup-form" onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className="main-input">
                <label className="signup-label">
                  <span>EMAIL ADDRESS</span>
                  {!validEmail && (
                    <span>Your valid email</span>
                  )}
                </label>
                <input
                  type='email'
                  className='signup-email-input'
                  name='email'
                  placeholder='Your valid email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div className="main-input">
                <label className="signup-label">
                  <span>PASSWORD</span>
                  {!validPassword && (
                    <span>At least 7 characters with one letter and number</span>
                  )}
                </label>
                <input
                  type='password'
                  className='signup-password-input'
                  name='password'
                  placeholder='At least 7 characters with one letter and number'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div className="main-input">
                <label className="signup-label">
                  <span>USERNAME</span>
                  {!validUsername && (
                    <span>Letters and numbers only please</span>
                  )}
                </label>
                <input
                  type='text'
                  className='signup-username-input'
                  name='username'
                  placeholder='Your custom wufoo URL'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <button className="signup-submit" type='submit'>CONFIRM</button>
            </form>
          </div>
        </div>
      </div>
    </div>





















    // <form onSubmit={onSignUp}>
    //   <div>
    //     {errors.map((error, ind) => (
    //       <div key={ind}>{error}</div>
    //     ))}
    //   </div>
    //   <div>
    //     <label>User Name</label>
    //     <input
    //       type='text'
    //       name='username'
    //       onChange={updateUsername}
    //       value={username}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Email</label>
    //     <input
    //       type='text'
    //       name='email'
    //       onChange={updateEmail}
    //       value={email}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input
    //       type='password'
    //       name='password'
    //       onChange={updatePassword}
    //       value={password}
    //     ></input>
    //   </div>
    //   <div>
    //     <label>Repeat Password</label>
    //     <input
    //       type='password'
    //       name='repeat_password'
    //       onChange={updateRepeatPassword}
    //       value={repeatPassword}
    //       required={true}
    //     ></input>
    //   </div>
    //   <button type='submit'>Sign Up</button>
    // </form>
  );
};

export default SignUpForm;
