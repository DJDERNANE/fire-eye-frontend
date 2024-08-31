/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./routes/Login";
import Dashboard from "./routes/Dashboard";
import Devices from "./routes/Devices";
import Users from "./routes/Users";
import Alerts from "./routes/Alerts";
import Regions from "./routes/Regions";
import { useSelector } from "react-redux";
import RegionDevices from "./routes/regionDevices";
import { MainApi } from "./utils/data/constant";
MainApi
const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState();
    async function fetchNotifications() {
      try {
          const response = await fetch(`${MainApi}alert/notify`);
          const data = await response.json();
          
          if(data.success){
            
          }
      } catch (error) {
          console.error('Error fetching notifications:', error);
      }
  }

  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications();
  
    // Set up an interval to fetch notifications every 2 minutes (120,000 milliseconds)
    const intervalId = setInterval(() => {
      fetchNotifications(); // Fetch notifications periodically
    }, 12000);
  
    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
    return (
      <Router>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/regiondevices" element={<RegionDevices />} />
            <Route path="/users" element={<Users />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/regions" element={<Regions />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route
              path="/*"
              element={
                <h1 className="font-bold text-center font-main text-5xl">
                  The requested URL doesn't exist.
                  <br /> 404 Not Found.
                </h1>
              }
            />
          </Routes>
        )}
      </Router>
    );
  };
export default App;
