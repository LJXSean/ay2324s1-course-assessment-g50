import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Register from "./authentication/Register";
import Login from "./authentication/Login";
import "./userProfileManager.css";
import { BsArrowLeftSquareFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { loginAction, selectCookie, registerAction, fetchUserDataAction } from '../../reducers/userSlice';


const UserProfileManager = () => {
  const dispatch = useDispatch();
  const validCookie = useSelector(selectCookie); 

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  /* Return back to questions */
  const goBack = () => {
    navigate('/');
  }

  /* sends user info to login before retrieving user info */
  const handleLogin = async (email, password) => {
    await dispatch(loginAction({email, password}));
    await dispatch(fetchUserDataAction());
  }

  /* register user info */
  const handleRegister = async (email, password) => {
    dispatch(registerAction({email, password}));
  }
  
  /* on sucessful login, navigate to questions */
  useEffect(() => {
    if (validCookie){
      navigate('/');
    }
  }, [validCookie])


  // @TODO: Have to dispatch(login action) and then subsequently check for state before logging in 

  // const fetchUserData = async () => {
  //   try {
  //     const url = `http://localhost:8000/users`;
  //     const response = await axios.get(url);
  //     setCurrentUser(response.data.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleUpdateUser = async (email) => {
  //   try {
  //     await axios.patch('http://localhost:8000/users/', { email });
  //     fetchUserData(currentUser.id);  // Assume the id field exists on the currentUser object
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <div className="authentication-page">
      <div className="authentication-container">
        <p className="title">{isLogin ? "LOGIN" : "REGISTER"}</p>
        {isLogin ? <Login handleLogin={handleLogin}/> : <Register handleRegister={handleRegister}/>}
        <p className="register-link" onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Not a user? Register here!" : "Back to Login"}</p>
          <div className="go-back" onClick={goBack}>
            <BsArrowLeftSquareFill  className="return-icon"/>
          </div>
      </div>
     
    </div>
    
  )
};

export default UserProfileManager;
