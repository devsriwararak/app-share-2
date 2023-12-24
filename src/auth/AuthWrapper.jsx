import React, { createContext, useContext, useEffect, useState } from "react";
import Login from "../pages/Login/Login";
import { Navigate, Route, Routes } from "react-router-dom";



// Components
import Register from "../pages/Login/Register";
import PrivateRoute from "../routes/PrivateRoute";

export const AuthContent = createContext();
// export const AuthData = () => useContext(AuthContent);

const AuthWrapper = () => {
  const [user, setUser] = useState({ name: "", isAuthenticated: false });
  const [token, setToken] = useState(localStorage.getItem("Token"));
  // const [token, setToken]=useState("")
  const [dataLogin , setDataLogin] = useState({})

  // const updateValue = (key,value)=>{
  //   setDataLogin((prev)=>({
  //     ...prev,
  //     key,value
  //   }))

  // }

  useEffect(()=>{
  },[token])



  return (
    <AuthContent.Provider value={{ user, token }}>
      <>
      {/* {JSON.stringify(dataLogin)} */}
        {token ? (
          <PrivateRoute />
        ) : (
          <Routes>
            <Route path="/" element={<Login  />} />
            <Route path="/login" element={<Login  />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </>
    </AuthContent.Provider>
  );
};

export default AuthWrapper;
