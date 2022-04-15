import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [validEmail, setValidEmail] = useState(false);
  // const [validPassword, setValidPassword] = useState(false);
  // const [validUsername, setValidUsername] = useState(false);
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let history = useHistory()

  const onSignUp = async (e) => {
    e.preventDefault();
    const data = await dispatch(signUp(username, email, password));
    if (data) {
      console.log("DATA: ", data)
      setErrors(data)
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

  let validEmail;
  let validPassword;
  let validUsername;



  if (email.includes('@')) {
    validEmail = true;
  };

  const pRegex = new RegExp(/[a-zA-Z0-9]{7,}/);

  if (pRegex.test(password)) {
    validPassword = true;
  };

  const uRegex = new RegExp(/[a-zA-Z0-9]/)

  if (uRegex.test(username)) {
    validUsername = true;
  };



  if (user) {
    return <Redirect to='/' />;
  }

  const handleLogin = () => {
    history.push('/login');
  };

  return (
    <div className="signup-wrapper">
      <nav className="signup-nav">
        <ul id="menu">
          <li className="logo-li">
            <Link to="/">

            </Link>
          </li>
          <li>
            <button type="button" onClick={handleLogin}>LOGIN</button>
          </li>
        </ul>
      </nav>
      <section className="heading">
        <h1>Create powerful forms today.</h1>
      </section>
      <div className="row">
        <div className="left-column">
          <div className="signup-form-container">
            <form onSubmit={onSignUp}>
              <div>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div>
                <label>
                  <span>EMAIL ADDRESS</span>
                  {!validEmail && (
                    <span>Invalid email</span>
                  )}
                </label>
                <input
                  type='email'
                  name='email'
                  placeholder='Your valid email'
                  onChange={updateEmail}
                  value={email}
                ></input>
              </div>
              <div>
                <label>
                  <span>PASSWORD</span>
                  {!validPassword && (
                    <span>At least 7 characters with one letter and number</span>
                  )}
                </label>
                <input
                  type='password'
                  name='password'
                  placeholder='At least 7 characters with one letter and number'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </div>
              <div>
                <label>
                  <span>USERNAME</span>
                  {!validUsername && (
                    <span>Letters and numbers only please</span>
                  )}
                </label>
                <input
                  type='text'
                  name='username'
                  placeholder='Your custom wufoo URL'
                  onChange={updateUsername}
                  value={username}
                ></input>
              </div>
              <button type='submit'>CONFIRM</button>
            </form>
          </div>
        </div>
        <aside className="feature-list">

        </aside>
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
