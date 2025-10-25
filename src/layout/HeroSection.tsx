import { Box, Typography } from "@mui/material";
import Read from "../images/read.svg";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: 500, my: 10, display: "flex", flexDirection: { xs: "column", lg: "row-reverse" }, justifyContent: "space-around", alignItems: "center", gap: 10 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1, sm: 2 } }}>
        <Typography variant="h4">
          <span className=" text-[40px] sm:text-[57px] font-bold tracking-wide cursor-default text-[#ee913d]">Al Quran Digital Bahasa Indonesia</span>
        </Typography>
        <Typography variant="h5">
          <span className=" font-primary text-xl">Baca, dengarkan, dan pelajari Al-Quran dengan terjemahan bahasa Indonesia, audio berkualitas tinggi, dan tafsir yang lengkap</span>
        </Typography>
      </Box>
    </Box>
  );
};

export default HeroSection;
