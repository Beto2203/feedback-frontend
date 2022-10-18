import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../Services/login.js';
import { createUser } from '../Services/users.js';
import { setToken } from '../Services/feedbacks';

function LoginForm({ setUser, title, signUp }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(true);
  const [errorMessage, setErrorMessage] = useState('Invalid input');

  const submitHandler = async () => {
    if (success) {
      const user = {
        username,
        password
      };

      if (signUp) {
        try {
          await createUser(user);
        } catch (err) {
          const res = err.response;
          setErrorMessage(res.data.error);
          setSuccess(false);
        }
      } else {
        try {
          const res = await loginUser({ username: user.username, password: user.password });
          setUser(res);
          window.localStorage.setItem('userFeedbackBlogCredentials', JSON.stringify(res));
          setToken(res.token);
        } catch (err) {
          setSuccess(false);
        }
      }
    }
  };

  const usernameHandler = ({ target }) => {
    setUsername(target.value);
    setSuccess(true);
    setErrorMessage('');
  };

  const passwordHandler = ({ target }) => {
    setPassword(target.value);
    setSuccess(true)
    setErrorMessage('');
  };

  const usernameClasses = (username.length !== 0 && username.length < 3) ? 'card invalid' : 'card';
  const passwordClasses = (password.length !== 0 && password.length < 4) ? 'card invalid' : 'card';
  const buttonClasses = (success) ? '' : 'invalidButton';

  const signInButtonText = (<>
    {
      success
        ? 'Sign in'
        : 'Invalid username or password'
    }
  </>);

  const signUpButtonText = (<>
    {
      success
        ? 'Sign up'
        : errorMessage
    }
  </>);

  return (
    <div id="loginScreen" className="card">
      <h1>{title}</h1>
      <div id="loginForm">
        <form>
          <label htmlFor="username">Username{signUp ? '*' : ''}:</label>
          <input type="text" className={usernameClasses} onChange={usernameHandler} value={username} />

          {
            signUp
            && <span className="alert">Username must be at least 3 characters long</span>
          }

          <label htmlFor="password">Password{signUp ? '*' : ''}:</label>
          <input type="password" className={passwordClasses} onChange={passwordHandler} value={password} />

          {
            signUp
            && <span className="alert">Password must be at least 4 characters long</span>
          }

          <button type="button"
                  disabled={success && (!username || username.length < 3 || !password || password.length < 4)}
                  onClick={submitHandler}
                  className={buttonClasses}
          >
            {
              signUp
                ? signUpButtonText
                : signInButtonText
            }
          </button>
        </form>
        {
          signUp
            ? <div>Already have an account? <Link to="/login">Sign in</Link></div>
            : <div>Need an account? <Link to="/signup">Sign up</Link></div>
        }
      </div>
    </div>
  );
}

export default LoginForm;
