import { FaSquareArrowUpRight } from "react-icons/fa6";
import "./register.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

//   const [id, setId] = useState('');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

//   const generateRandomId = () => {
//     const randomId = Math.floor(10000000 + Math.random() * 90000000);
//     setId(randomId.toString());
//   };

  const generateRandomId = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };
  const generateAccountNumber = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };



  const isValidate = () => {
    let isproceed = true;
    let errormessage = 'Please enter the value in ';
    
    if (!formData.firstName) {
      isproceed = false;
      errormessage += 'First Name, ';
    }
    if (!formData.lastName) {
      isproceed = false;
      errormessage += 'Last Name, ';
    }
    if (!formData.password) {
      isproceed = false;
      errormessage += 'Password, ';
    }
    if (!formData.email) {
      isproceed = false;
      errormessage += 'Email, ';
    }
    if (formData.email && !emailPattern.test(formData.email)) {
      isproceed = false;
      errormessage += 'Invalid Email format, ';
    }

    if (!isproceed) {
      toast.warning(errormessage.slice(0, -2)); // Remove the last comma and space
    }

    return isproceed;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isValidate()) {
        const id = generateRandomId();
        const accountNumber = generateAccountNumber();
        const balance = 5000;
        // const isAuthenticated = false;
        // const activeUser = null;
        const transactionHisotry = []
      const registrationData = { ...formData, id, accountNumber, balance, transactionHisotry };

      fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      })
        .then((res) => {
          if (res.ok) {
            toast.success('Registered successfully.');
            navigate('/login');
          } else {
            throw new Error("Failed to register.");
          }
        })
        .catch((err) => {
          toast.error('Failed: ' + err.message);
        });
    }
  };

  return (
    <div className='register-container'>
      <div className="register-left">
        <div className="register-logo-wrap">
          <h3>Spatch</h3>
          <span><FaSquareArrowUpRight size={25} className="login-logo" /></span>
        </div>
        <div className="register-content-wrap">
          <form className="register-content-wrap-main" onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className="register-input-wrap">
              <label>First name*</label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                type="text"
                placeholder="Enter first name"
              />
            </div>
            <div className="register-input-wrap">
              <label>Last name*</label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                type="text"
                placeholder="Enter last name"
              />
            </div>
            <div className="register-input-wrap">
              <label>Email Address*</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="text"
                placeholder="Enter email address"
              />
            </div>
            <div className="register-input-wrap">
              <label>Password*</label>
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="Enter Password"
              />
            </div>

            <button type="submit" className="register-btn">Create Account</button>
            <div className="login-register-wrap">
             <h4> Already have an account?</h4> <Link to={"/Login"}> <span>Login</span></Link>
            </div>
          </form>
        </div>
      </div>
      <div className="register-right">
       {/* Optional right section */}
      </div> 
    </div>
  );
}

export default Register;
