import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Products from "./pages/Products/Products";
import Dashboard from "./pages/Dashboards/Dashboard";
import Layout from "./components/shard/Layout";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import AuthWrapper from "./auth/AuthWrapper";

import './App.css'




const App = () => {

  // useEffect(()=>{
  //   console.log(token);
  // },[token])



  return (


    <BrowserRouter>
    <AuthWrapper/>
    </BrowserRouter>


 
  );
};

export default App;
