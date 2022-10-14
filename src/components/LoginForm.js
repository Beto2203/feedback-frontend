import { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginForm({ setUser, title, signUp }) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = () => {
    const user = {
      name,
      username,
      password
    };

    setUser(user);
  };

  const usernameClasses = (username.length !== 0 && username.length < 3) ? 'card invalid' : 'card';
  const passwordClasses = (password.length !== 0 && password.length < 4) ? 'card invalid' : 'card';

  return (
    <div id="loginScreen" className="card">
      <h1>{title}</h1>
      <div id="loginForm">
        <form>
          {
            signUp
            && <label htmlFor="FirstName">First name*:</label>
          }
          {
            signUp
            && <input type="text" className="card" onInput={(e) => setName(e.target.value)} />
          }

          <label htmlFor="username">Username{signUp ? '*' : ''}:</label>
          <input type="text" className={usernameClasses} onInput={(e) => setUsername(e.target.value)} />

          {
            signUp
            && <span className="alert">Username must be at least 3 characters long</span>
          }

          <label htmlFor="password">Password{signUp ? '*' : ''}:</label>
          <input type="password" className={passwordClasses} onInput={(e) => setPassword(e.target.value)} />

          {
            signUp
            && <span className="alert">Password must be at least 4 characters long</span>
          }

          <button type="button"
                  disabled={!name || !username || username.length < 3 || !password || password.length < 4}>Sign in
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
