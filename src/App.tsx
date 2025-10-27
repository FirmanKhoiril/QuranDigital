import "./App.css";
import { Routes, Route } from "react-router-dom";
import {  Home, QuranDetails } from "./pages";
import { Footer, Navbar } from "./layout";

function App() {
  return (
    <div className=" dark:bg-[#0c0c0c] text-white/90 relative min-h-screen px-2 sm:px-4 bg-slate-100">
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" index element={<Home />} />
            <Route path="/surah/:id" element={<QuranDetails />} />
          </Route>
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
