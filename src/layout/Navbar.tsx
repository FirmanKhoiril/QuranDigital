import { Outlet } from "react-router-dom";
import { NavComp } from "../components";
import { Box } from "@mui/material";
const Navbar = () => {
  return (
    <>
      <Box sx={{ bgcolor: "#0c0c0c", zIndex: 30 }}>
        <NavComp />
      </Box>

      <Outlet />
    </>
  );
};

export default Navbar;
