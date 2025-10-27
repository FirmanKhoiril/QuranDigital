import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { IoBookOutline } from "react-icons/io5";
// import { BsMoon, BsSun } from "react-icons/bs";
// import { useGlobalContext } from "../utils/ContextAPI";

const NavComp = () => {
  // const { mode, setMode } = useGlobalContext();

  // const handleThemeToggle = () => {
  //   setMode((prev: "light" | "dark") => (prev === "light" ? "dark" : "light"));
  // };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        p: 2,
        alignItems: "center",
      }}
    >
      <Link to="/">
        <Typography
          variant="h4"
          sx={{
            letterSpacing: "0.10rem",
            display: "flex",
            gap: 1.5,
            fontSize: {xs: 16, sm: 20},
            alignItems: "center",
            backgroundColor: "rgba(238, 145, 61, 0.04)",
            padding: 1,
            borderRadius: 2,
          }}
        >
          <IoBookOutline color="#ee913d" />
          <span className="logo">Hidayah Qur’an</span>
        </Typography>
      </Link>
      {/* <Box
        onClick={handleThemeToggle}
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          p: 1,
          borderRadius: "50%",
          "&:hover": {
            backgroundColor: "rgba(238,145,61,0.1)",
          },
        }}
      >
        {mode === "dark" ? (
          <BsMoon size={22} color="white" />
        ) : (
          <BsSun size={22} color="black" />
        )}
      </Box> */}
    </Box>
  );
};

export default NavComp;
