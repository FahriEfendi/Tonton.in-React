import React from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const Layout = ({ children }) => {
  return (
    <React.Fragment>
  <Navbar />
  <div className="flex flex-col md:flex-row min-h-screen ">
    <div className="">
      <Sidebar />
    </div>
    <div className="md:w-5/6 xl:w-full">
      <main>{children}</main>
    </div>
  </div>
</React.Fragment>

  
  );
};

export default Layout;