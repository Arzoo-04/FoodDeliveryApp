import React, { useContext, useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [currState, setCurrState] = useState("Sign Up");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is trying to log in as an admin

    const onChangehandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const onLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        let newUrl = url;
        if (currState === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            const response = await axios.post(newUrl, data);
            if (response.data.success) {
                setToken(response.data.token);
                localStorage.setItem("token", response.data.token);

                // Access the admin credentials and URL from environment variables
                // const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
                // const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
                // const adminUrl = process.env.REACT_APP_ADMIN_URL;

                const adminEmail = "arzoosingh473@gmail.com";
                const adminPassword = "123456789";
                const adminUrl = "https://mealmetroadmin.netlify.app/";

                if (isAdmin) {
                    // Check if the credentials match the admin's
                    if (data.email === adminEmail && data.password === adminPassword) {
                        // Redirect to the admin dashboard
                        window.location.href = adminUrl;
                    } else {
                        alert("You are not an admin.");
                    }
                } else {
                    // Close the login popup for regular users
                    setShowLogin(false);
                }
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? null : <input name='name' onChange={onChangehandler} value={data.name} type="text" placeholder='Your name' required />}
                    <input name='email' onChange={onChangehandler} value={data.email} type="email" placeholder='Your email' required />
                    <input name='password' onChange={onChangehandler} value={data.password} type="password" placeholder='Password' required />
                </div>
                <button type='submit' disabled={loading}>{loading ? "Loading..." : (currState === "Sign Up" ? "Create account" : "Login")}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By Continuing, I agree to the terms of use & privacy policy</p>
                </div>
                {currState === "Login" && (
                    <div className="login-popup-admin">
                        <input type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
                        <label>Are you an admin?</label>
                    </div>
                )}
                {
                    currState === "Login" ?
                        <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span></p> :
                        <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>
    );
};

export default LoginPopup;
