import { Outlet } from "react-router-dom";
import { NavComp } from "../components";
import { Box, Container } from "@mui/material";
const Navbar = () => {
  return (
    <>
      <Container>
        <Box sx={{ bgcolor: "#0c0c0c", zIndex: 30 }}>
          <NavComp />
        </Box>
      </Container>

      <Outlet />
    </>
  );
};

export default Navbar;
