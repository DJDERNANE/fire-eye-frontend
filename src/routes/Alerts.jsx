/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */

import React, {useState, useEffect} from "react";
import Template from "../comps/Template";
import { TiWarningOutline } from "react-icons/ti";
import { MainApi } from "../utils/data/constant";


const Alert = (props) => {
  let styles = {
    background: props.status === "Pending" ? "#EDD245" : "#28CC42",
  };
  return (
    <tr>
      <th>
        <button onClick={props.handleClick} style={styles} className="py-1 rounded w-20 m-auto">
          {props.status}
        </button>
      </th>
      <td>{props.region}</td>
      <td className="">{props.time}</td>
      <td className="">{props.wilaya}</td>
    </tr>
  );
};

const Alerts = () => {
  const [notification, setNotification] = useState([]);
  const getData = async () => {
    try {
      const response = await fetch(`${MainApi}alert`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        // Handle non-200 status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setNotification(result.notifications);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Template>
      <div className="flex flex-col  ">
        <h1 className="font-main text-4xl text-black font-bold pt-4 text-center">
          Welcome back, {`Walid Younes`}
        </h1>
        <div className="ml-5 flex items-center gap-x-4">
          <div className="relative">
            <TiWarningOutline size={40} />
            <div className="absolute rounded-[50%] bg-red-600 w-2 h-2 top-0 left-0"></div>
            
          </div>
          <p className="fs-3 my-3 fw-bold ">Alerts history</p>
        </div>
      </div>
      <div className="p-0 bg-white rounded-4 table-container">
        <table className="table table-hover custom-table">
          <thead>
            <tr>
              <th scope="col">Status</th>
              <th scope="col">Region</th>
              <th scope="col">Date</th>
              <th scope="col">Wilaya</th>
            </tr>
          </thead>
          <tbody>
            {notification.map((alert) => (
              <Alert
                status={alert.status === 0 ? "unread" : "read"}
                region={alert.region.name}
                time={alert.createdAt}
                wilaya={alert.region.wilaya}
              />
            ))}
          </tbody>
        </table>
      </div>
    </Template>
  );
};

export default Alerts;