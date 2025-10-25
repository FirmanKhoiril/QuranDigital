import "./App.css";
import { Box, Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import {  Home, QuranDetails } from "./pages";
import { Footer, Navbar } from "./layout";

function App() {
  return (
    <Box sx={{ bgcolor: "#0c0c0c", color: "whitesmoke", position: "relative", minHeight: "100vh" }}>
      <Container>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" index element={<Home />} />
            <Route path="/surah/:id" element={<QuranDetails />} />
          </Route>
        </Routes>
        <Footer />
      </Container>
    </Box>
  );
}

export default App;
