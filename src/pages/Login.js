import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        'https://reqres.in/api/login', 
        { email,
          password,
         }, {
          headers: {
            'x-api-Key': 'reqres-free-v1'
          }
         });

      if (res.data.token) {
      localStorage.setItem('token', res.data.token);
      if (remember) {
        localStorage.setItem('remember', 'true');
      }
      toast.success('Login Successful');

      setTimeout(() => {
      navigate('/dashboard');
      }, 1500);
    } else {
      toast.error('Login failed: No token received');
    }
     } catch (error) {
      const message = error.response?.data?.error || 'Something went wrong. Please try again.';
      toast.error(`Login Failed: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container"> {/* Custom class for styling */}
      <ToastContainer />
      <form onSubmit={handleLogin} className="login-form"> {/* Custom class for styling */}
        <h2 className="login-title">Login</h2> {/* Custom class for styling */}
        <input
          type="email"
          placeholder="Email"
          className="login-input" // Custom class for styling
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input" // Custom class for styling
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="login-remember-me"> {/* Custom class for styling */}
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span className="remember-me-text">Remember Me</span> {/* Custom class for styling */}
        </label>
        <button type="submit" className="login-button"> {/* Custom class for styling */}
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
