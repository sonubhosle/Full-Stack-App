import React from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../../State/Admin_Auth/Action';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);


    React.useEffect(() => {
        if (auth.error) {
            toast.error(auth.error);
        } else if (auth.jwt) {
            toast.success('Sign up successful!');
            navigate('/');
        }
    }, [auth, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const userData = {
            userName: data.get('userName'),
            name: data.get('name'),
            surname: data.get('surname'),
            mobile: data.get('mobile'),
            password: data.get('password'),
            email: data.get('email'),
            photo: data.get('photo'),
            role: data.get('role')
        };
        dispatch(register(userData))
    };

    return (
        <div className='form-section'>

            <form onSubmit={handleSubmit}>
                <h3>Admin Signup</h3>
                <div className="input-group big">
                    <input className='mb' type="text" name="userName" id="userName" placeholder='Admin User Name' />
                    <input className='mb' type="text" name="name" id="name" placeholder='Admin Name' />
                </div>
                <div className="input-group big">
                    <input className='mb' type="text" name="surname" id="surname" placeholder='Admin Surname' />
                    <input className='mb' type="text" name="mobile" id="mobile" placeholder='Admin Mobile' />
                </div>
                <div className="input-group big">
                    <input className='mb' type="email" name="email" id="email" placeholder='Admin Email' />
                    <input className='mb' type="password" name="password" id="password" placeholder='Admin Password' />
                </div>
                <div className="input-group big">
                    <input className='mb' type="url" name="photo" id="photo" placeholder='Admin Profile Url' />
                    <input className='mb' type="text" name="role" id="role" placeholder='Your Role' />
                </div>
                <button type='submit' className='login-btn'>Signup</button>
                <div className='bottom'>
                If you already have an account <div className='nav-btn' onClick={() => navigate('/login')}>Login</div>

            </div>
            </form>

          
        </div>
    );
};

export default Signup;
