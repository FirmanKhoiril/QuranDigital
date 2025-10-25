import { Box, Typography } from "@mui/material";
import { HeartIcon } from "lucide-react";

const Footer = () => {
  return (
    <Box sx={{ minHeight: 200, display: "flex", justifyContent: "space-around", flexDirection: { xs: "column", md: "row-reverse", overflow: "hidden" }, marginTop: 10 }}>
      <Typography>
        <span className="font-quicksand">©2025 QuranHub.vercel.app All rights reserved.</span>
      </Typography>
      <Typography>
        <span className=" text-white/50 flex items-center gap-4 cursor-default text-[13px] font-quicksand">
          {" "}
          Made by Firman from Indonesia with<HeartIcon color="red" />
        </span>
      </Typography>
    </Box>
  );
};

export default Footer;
