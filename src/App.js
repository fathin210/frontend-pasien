import "./App.css";
import Login from "./views/pages/Login";
import { Routes, Route } from "react-router-dom";
import GuardRoute from "./views/components/GuardRoute";
import Home from "./views/pages/Home";
import Booking from "./views/pages/Booking";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Profile from "./views/pages/Profile";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<GuardRoute />}>
            <Route index element={<Home />} />
            <Route path="booking" element={<Booking />} />
            <Route path="user" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
