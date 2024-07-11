import React, { useState, useEffect } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { ColorModeContext, useMode } from "../theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { MyProSidebarProvider } from "../pages/global/sidebar/sidebarContext";
import Topbar from "../pages/global/Topbar";
import { FaUser, FaBox, FaDragon } from 'react-icons/fa';

function Dashboard() {
  const { user } = useSelector((state) => state.auth);
  const [theme, colorMode] = useMode();
  const [timeOfDay, setTimeOfDay] = useState(''); // 'morning', 'afternoon', 'evening'
  const [charcount, setCharcount] = useState([]);
  const [itemcount, setItemcount] = useState([]);

  
  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setTimeOfDay('morning');
    } else if (currentHour >= 12 && currentHour < 18) {
      setTimeOfDay('afternoon');
    } else {
      setTimeOfDay('evening');
    }
    //getChar();
    //getItem();
  }, []);

  /* const getChar = async () => {
    const response = await axios.get("http://localhost:5000/charactercount");
    setCharcount(response.data);
  };

  const getItem = async () => {
    const response = await axios.get("http://localhost:5000/itemcount");
    setItemcount(response.data);
  }; */

  const renderGreeting = () => {
    switch (timeOfDay) {
      case 'morning':
        return <p>Selamat Pagi, {user && user.nama}!</p>;
      case 'afternoon':
        return <p>Selamat Siang,  {user && user.nama}!</p>;
      case 'evening':
        return <p>Selamat Malam,  {user && user.nama}!</p>;
      default:
        return null;
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div className="min-h-full" style={{ height: "100%", width: "100%" }}>
            <Helmet>
              <title>Shifty | Dashboard</title>
            </Helmet>
            <Topbar />


            <main className="w-11/12 md:w-9/12 border-1 p-4 mb-4 rounded mx-auto">
            <div className="flex-1 p-4 border rounded relative mb-5">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span>{renderGreeting()}</span>
                  </h2>
                </div>
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1 p-4 border rounded relative">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span>Karakter</span>
                    <span className="ml-2">{charcount.totalCharacters}</span>
                    <FaUser className="md:mt-3 md:mr-5 absolute right-0" style={{ fontSize: '2rem' }} />
                  </h2>
                </div>

                <div className="flex-1 p-4 border rounded relative">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span>Item</span>
                    <span className="ml-2">{itemcount.totalCharacters}</span>
                    <FaBox className="md:mt-3 md:mr-5 absolute right-0" style={{ fontSize: '2rem' }} />
                  </h2>
                </div>

                <div className="flex-1 p-4 border rounded relative">
                  <h2 className="text-lg font-semibold mb-4 flex items-center">
                    <span>Monsters</span>
                    <span className="ml-2">2</span>
                    <FaDragon className="md:mt-3 md:mr-5 absolute right-0" style={{ fontSize: '2rem' }} />
                  </h2>
                </div>
              </div>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default Dashboard;