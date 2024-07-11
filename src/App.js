import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import UserList from "./pages/Users";
import AddBokepindo from "./pages/AddBokepindo.jsx";
import CharacterList from "./pages/Bokep-Indo.jsx";
import RaraNadifa from "./components/bokep-indo/rara-nadifa.jsx";
import Babyzhu from "./components/bokep-indo/baby-zhu.jsx";
import Manda from "./components/bokep-indo/manda.jsx";
import NgentotMajikan from "./components/bokep-indo/ngentot-majikan.jsx";
import RevaMango from "./components/bokep-indo/reva-mango.jsx";
import Smptetek from "./components/bokep-indo/smp-tetek.jsx";
import Smatetek from "./components/bokep-indo/sma-tetek-2.jsx";
import Tante from "./components/bokep-indo/tante.jsx";
import Anisa from "./components/bokep-indo/anisa.jsx";
import Meruchan from "./components/bokep-indo/meruchan.jsx";
import Arachu from "./components/bokep-indo/arachu.jsx";
import Akie from "./components/bokep-indo/akie-scandal.jsx";
import Miiyah from "./components/bokep-indo/miiyah.jsx";
import Pamertetek from "./components/bokep-indo/pamer-tetek.jsx";
import Smatetek3 from "./components/bokep-indo/sma-tetek-3.jsx";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/addbokepindo" element={<AddBokepindo />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/bokepindo" element={<CharacterList />} />
          <Route path="/videos/rara-nadifa" element={<RaraNadifa />} />
          <Route path="/videos/baby-zhu" element={<Babyzhu />} />
          <Route path="/videos/manda" element={<Manda />} />
          <Route path="/videos/ngentot-majikan" element={<NgentotMajikan />} />
          <Route path="/videos/reva-mango" element={<RevaMango />} />
          <Route path="/videos/smp-tetek" element={<Smptetek />} />
          <Route path="/videos/sma-tetek-2" element={<Smatetek />} />
          <Route path="/videos/tante" element={<Tante />} />
          <Route path="/videos/anisa" element={<Anisa />} />
          <Route path="/videos/meruchan" element={<Meruchan />} />
          <Route path="/videos/arachu" element={<Arachu />} />
          <Route path="/videos/akie-scandal" element={<Akie />} />
          <Route path="/videos/miiyah" element={<Miiyah />} />
          <Route path="/videos/pamer-tetek" element={<Pamertetek />} />
          <Route path="/videos/sma-tetek" element={<Smatetek3 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
