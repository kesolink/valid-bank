import { useState } from "react";
import "./login.scss";
import { FaSquareArrowUpRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/userReducer';
import Logo from "../assets/image/Group 3.png"
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
    const dispatch = useDispatch();
    // Access `user` state directly
    const authenticated = useSelector((state) => state.user.isAuthenticated);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    console.log(authenticated)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/users')
            .then((response) => response.json())
            .then((data) => {
                const user = Array.isArray(data) && data.find(
                    (user) =>
                        user.email === formData.email && user.password === formData.password
                );

                if (user) {
                    navigate("/dash");
                    dispatch(loginSuccess({ user })); // Dispatch with user data
                     // Redirect to the dashboard on successful login
                     toast.success('Login successful!');
                } else {
                    alert('Invalid credentials.');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Login failed. Please try again later.');
            });
    };

    return (
        <div className='login-container'>
            <div className="login-left">
                <div className="login-logo-wrap">
                    <h3>Spatch</h3>
                    <span>
                        <FaSquareArrowUpRight size={25} className="login-logo" />
                    </span>
                </div>
            </div>
            <div className="login-right">
                <div className="logo-wrap">
                    <img src={Logo} alt="" />
                </div>
                <div className="login-wrapper">
                <form className="login-content-wrap" onSubmit={handleSubmit}>
                    <h1>Sign In</h1>
                    <div className="login-email-wrap">
                        <label>Email Address*</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter email address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="login-password-wrap">
                        <label>Password*</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Sign In
                    </button>
                    <div className="login-register-wrap">
                        <h4>Don't have an account?</h4> <Link to={"/register"}> <span>Register</span></Link>
                    </div>
                </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
