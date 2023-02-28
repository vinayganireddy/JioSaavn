import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Player from "./components/player";
import SideBar from "./components/sideBar";
import Home from "./pages/home";

function App() {
  return (
    <>
      <Navbar />
      <SideBar/>
      {/* <Routes>
        <Route index element={<Home />} />
      </Routes> */}
      <Player />
    </>
  );
}

export default App;
