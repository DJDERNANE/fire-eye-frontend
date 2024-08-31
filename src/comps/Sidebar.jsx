import React from "react";
import { useSelector } from "react-redux"; // Importing useSelector from react-redux
import { NavLink } from "react-router-dom";
import { GiDeliveryDrone } from "react-icons/gi";
import { FaHome, FaUser } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { GrLocation } from "react-icons/gr";
import fireeye from '../assets/fireeye.svg';

const Sidebar = () => {
  const { admin } = useSelector((state) => state.auth); // Ensure auth state is correctly accessed
  const visible = useSelector((state) => state.sidebar.visible);
  // Define navlinks based on admin privileges
  const navlinks = [
    { icon: FaHome, name: "Dashboard" },
    !admin ? { icon: GiDeliveryDrone, name: "Devices" } : { icon: GiDeliveryDrone, name: "RegionDevices" },
    !admin ? { icon: TiWarning, name: "Alerts" } : { icon: TiWarning, name: "RegionAlerts" },
    !admin ? { icon: FaUser, name: "Users" } :{ icon: FaUser, name: "Fires" },
    !admin ?  { icon: GrLocation,
      name: "Regions",
    } : {}
  ];

  return (
    <div className={`sidebar ${visible ? 'active p-5 px-8': ''} flex flex-col bg-[#182448] h-screen `} >

      <div className="mb-5">
        <img src={fireeye} alt="" />
      </div>
      <div>
        {navlinks.map((item, index) => {
          let link =
            item.name === "Dashboard"
              ? "/dashboard"
              : `/${item.name.toLowerCase()}`;

          return (
            <NavLink
              to={`${link}`}
                className="flex items-center gap-4 p-3 rounded w-full"
              style={({ isActive }) => {
                if (isActive) {
                  return { background: "linear-gradient(90deg, rgba(224, 212, 212, 0) 0%, rgba(255, 255, 255, 0.25) 100%)" };
                }
              }}
            >
              {<item.icon color="white" size={20}/>}	
              <p className="font-main font-semibold text-xl text-white">{item.name}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;