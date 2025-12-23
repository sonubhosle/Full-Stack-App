import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../State/Admin_Auth/Action';
import { toast } from 'react-toastify';
import '../../Styles/Auth.css'


const Admin_Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  React.useEffect(() => {

    if (auth.error) {
      toast.error('Your Not Admin');
    } else if (auth.jwt && auth.user) {
      toast.success('Admin Login successful!');
      navigate('/');
    }
  }, [auth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    dispatch(login(userData));
  };

  return (
    <div className='form-section'>
      <form onSubmit={handleSubmit}>
        <h3>Admin Login</h3>
        <div className="input-group">
          <input type="email" name="email" id="email" placeholder=" Admin Email"  required/>
        </div>
        <div className="input-group">
          <input type="password" name="password" id="password" placeholder="Admin Password" required />
        </div>
        <button type="submit" className='login-btn'>Login</button>
        <div className="bottom">
          If you already have an account
          <div className='nav-btn' onClick={() => navigate('/signup')}>Signup</div>
        </div>
      </form>
    </div>
  );
};

export default Admin_Login;
