import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "../components/shard/Layout";
import Dashboard from "../pages/Dashboards/Dashboard";
import Products from "../pages/Products/Products";
import Home from "../pages/Home/Home";
import BasicHome from "../pages/AdminMain/Basic/BasicHome";
import BasicWong from "../pages/AdminMain/Basic/BasicWong";
import CrudAdmin from "../pages/AdminMain/CrudAdmin";
import HomeShare from "../pages/AdminMain/Homes/HomeShare";
import GroupShare from "../pages/AdminMain/Homes/GroupShare";
import User from "../pages/AdminMain/User/User";
import Member from "../pages/Home/Member";
import AddToWongShare from "../pages/User/AddToWongShare";
import IndexUser from '../pages/User/User'
import MyWong from "../pages/User/MyWong";
import ManageUser from "../pages/Home/User/ManageUser";
import HomeWongShare from '../pages/Home/HomeWongShare'
import Play from "../pages/Home/Play/Play";
import HomeRePort from '../pages/Home/Report/HomeReport'
import DashboardUser from "../pages/Dashboards/Users/DashboardUser";
import DashboardHome from "../pages/Dashboards/Home/DashboardHome";
let Type = localStorage.getItem("Type");

const PrivateRoute = () => {
  return (
    <>
      {Type == "main-admin" || Type == "admin" ? (
        <Routes>
          <Route path="/admin" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="/admin/basic/home" element={<BasicHome />} />
            <Route path="/admin/basic/wong" element={<BasicWong />} />
            <Route path="/admin/crud-admin" element={<CrudAdmin />} />
            <Route path="/admin/home-share" element={<HomeShare />} />
            <Route path="/admin/group-share" element={<GroupShare />} />
            <Route path="/admin/manage-user" element={<User />} />
          </Route>
          <Route path="/" element={<Navigate to="/admin" />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      ) : (
        ""
      )}
      {Type == "user" ? (
        <Routes>
          <Route  path="/user" element={<Layout />}>
            <Route index   element={<DashboardUser />} />
            {/* <Route path="/user/dashboard" element={<DashboardUser />} /> */}
            <Route path="/user/add-to-wong-share" element={<AddToWongShare />} />
            <Route path="/user/my-wong" element={<MyWong />} />

          </Route>
          <Route path="/" element={<Navigate to="/user" />} />
          <Route path="*" element={<Navigate to="/user" />} />
        </Routes>
      ) : (
        ""
      )}

      {Type == "home" || Type == "member" ? (
        <Routes>
          <Route path="/home" element={<Layout />}>
            <Route index element={<DashboardHome />} />
            <Route path="/home/manage-user" element={<ManageUser />} />
            <Route path="/home/wong-share" element={<HomeWongShare />} />
            <Route path="/home/member" element={<Member />} />
            <Route path="/home/play" element={<Play />} />
            <Route path="/home/report" element={<HomeRePort />} />

          </Route>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      ) : (
        ""
      )}

      {/* {Type == "member" ? (
        <Routes>
          <Route path="/member" element={<Layout />}>
            <Route index element={<Member />} />
          </Route>
          <Route path="/" element={<Navigate to="/member" />} />
          <Route path="*" element={<Navigate to="/member" />} />
        </Routes>
      ) : (
        ""
      )} */}
    </>
  );
};

export default PrivateRoute;
