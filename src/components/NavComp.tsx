import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";

const NavComp = () => {

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", p: 2 }}>
      <Link to="/">
        <Typography variant="h4" sx={{ letterSpacing: "0.10rem", display: "flex", gap: 1.5, alignItems: "center", backgroundColor: "rgba(238, 145, 61, 0.04)", padding: 1, borderRadius: 2  }}>
          <IoBookOutline color="#ee913d" />
          <span className="logo ">Hidayah Qur’an</span>
        </Typography>
      </Link>

      <Box>
        
      </Box>
    </Box>
  );
};

export default NavComp;
