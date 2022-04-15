import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login, signUp } from '../../store/session';

const LoginForm = () => {
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

  console.log('Errors', errors)
  console.log('Logic', errors.find(e => e.includes('email')))

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
        console.log("DATA: ", data)
        setErrors(data)
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

  const pRegex = new RegExp(/[a-zA-Z0-9]{7,}/);
  const uRegex = new RegExp(/[a-zA-Z0-9]/);

  if (email.includes('@')) {
    validEmail = true;
  };

  if (pRegex.test(password)) {
    validPassword = true;
  };

  if (uRegex.test(username)) {
    validUsername = true;
  };

  if (user) {
    return <Redirect to={`/forms/${user.id}`} />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <section className="title-block">
          <h1>Welcome to Rareform!</h1>
          <p>Create an account or log in</p>
        </section>
        <section className="login-form-parent">
          {!showSignup && (
            <form onSubmit={onLogin}>
              <div>
                {errors.find(e => e.includes('email')) && (
                  <span>{errors.find(e => e.includes('email')).slice(8)}</span>
                )}
                <input
                  name='email'
                  type='email'
                  placeholder='EMAIL ADDRESS'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className="radio-btn-div">
                <span className="sign-up-span">
                  <input type="radio" checked={false} onChange={handleSignUpRadio}/>
                  Sign up for a free account
                </span>
                <span className="login-span">
                  <input type="radio" checked={true} onChange={handleLoginRadio}/>
                  Login to my account
                </span>
              </div>
              <div className="password-input-div">
                {errors.find(e => e.includes('password')) && (
                  <span>{errors.find(e => e.includes('password')).slice(11)}</span>
                )}
                <input
                  name='password'
                  type='password'
                  placeholder='PASSWORD'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className="confirm-btn-div">
                <button type='submit'>CONFIRM</button>
              </div>
            </form>
          )}
          {showSignup && (
            <form onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                {!validEmail && (
                  <span>Your valid email</span>
                )}
                <input
                  name='email'
                  type='email'
                  placeholder='EMAIL ADDRESS'
                  value={email}
                  onChange={updateEmail}
                />
              </div>
              <div className="radio-btn-div">
                <span className="sign-up-span">
                  <input type="radio" checked={true} onChange={handleSignUpRadio}/>
                  Sign up for a free account
                </span>
                <span className="login-span">
                  <input type="radio" checked={false} onChange={handleLoginRadio}/>
                  Login to my account
                </span>
              </div>
              <div className="password-input-div">
                {!validPassword && (
                  <span>At least 7 characters with one letter and number</span>
                )}
                <input
                  name='password'
                  type='password'
                  placeholder='PASSWORD'
                  value={password}
                  onChange={updatePassword}
                />
              </div>
              <div className="username-input-div">
                {!validUsername && (
                    <span>Letters and numbers only please</span>
                )}
                <input
                  name='username'
                  type='text'
                  placeholder='USERNAME'
                  value={username}
                  onChange={updateUsername}
                />
              </div>
              <div className="sign-up-btn-div">
                <button type='submit'>SIGN UP</button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>





    // <form onSubmit={onLogin}>
      // <div>
      //   {errors.map((error, ind) => (
      //     <div key={ind}>{error}</div>
      //   ))}
      // </div>
    //   <div>
    //     <label htmlFor='email'>Email</label>
    //     <input
    //       name='email'
    //       type='text'
    //       placeholder='EMAIL ADDRESS'
    //       value={email}
    //       onChange={updateEmail}
    //     />
    //   </div>
    //   <div>
    //     <label htmlFor='password'>Password</label>
        // <input
        //   name='password'
        //   type='password'
        //   placeholder='PASSWORD'
        //   value={password}
        //   onChange={updatePassword}
        // />
        // <button type='submit'>CONFIRM</button>
    //   </div>
    // </form>
  );
};

export default LoginForm;
