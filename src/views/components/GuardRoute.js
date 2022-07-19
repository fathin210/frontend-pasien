import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { AuthController } from "../../redux/controllers/AuthController";
import Layout from "./Layout";

function GuardRoute() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("access_token"));
  // const authController = new AuthController();
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(authController.getDetail());
  // }, []);

  return isAuth ? <Layout /> : <Navigate to="/login" />;
}

export default GuardRoute;
