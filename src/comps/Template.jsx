/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from "react";
import Sidebar from "../comps/Sidebar";
import UpperBar from "../comps/UpperBar";

const Template = (props) => {

  return (
    <div className="tempalte flex " style={{height: '100vh'}}>
      <Sidebar></Sidebar>
      <div className="flex flex-col w-full">
        <UpperBar></UpperBar>
        <div className="content bg-[#D9D9D9] h-screen pl-5 pt-2" style={{overflowY: 'scroll'}}>
                {props.children}
        </div>
      </div>
    </div>
  );
};

export default Template;