import { Box, Typography, Card, CardContent } from "@mui/material";
import { features } from "../utils/DummyData";

const HeroSection = () => {
  return (
    <Box
      sx={{
        minHeight: 200,
        my: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 1, sm: 2 },
          alignItems: "center",
        }}
      >
        <Typography variant="h4">
          <span
            className="text-[32px] sm:text-[57px] font-semibold font-quicksand tracking-wide cursor-default 
            bg-gradient-to-r from-[#ffb347] via-[#ee913d] to-[#ff6a00] 
            text-transparent bg-clip-text"
          >
            Al Quran Digital Bahasa Indonesia
          </span>
        </Typography>
        <Typography variant="h5">
          <span className="text-base sm:text-xl font-thin text-center font-quicksand text-slate-400/90">
            Baca, dengarkan, dan pelajari Al-Quran dengan terjemahan bahasa
            Indonesia,
            <br className="md:block hidden" />
            audio berkualitas tinggi, dan tafsir yang lengkap
          </span>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
          width: "100%",
          maxWidth: 1000,
          justifyItems: "center",
        }}
      >
        {features.map((item, index) => (
          <Card
            key={index}
            sx={{
              borderRadius: "16px",
              backgroundColor: "#111",
              border: "1px solid #333",
              width: "100%",
              maxWidth: { xs: "100%", sm: 220 },
              textAlign: "center",
            }}
          >
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    borderRadius: "50%",
                    width: 60,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                  }}
                >
                  {item.icon}
                </Box>
                <Typography
                  variant="h6"
                  className="font-quicksand text-white"
                  sx={{ fontSize: "1rem", fontWeight: 600 }}
                >
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  className="font-quicksand font-thin text-slate-400/80"
                  sx={{ fontSize: "0.85rem" }}
                >
                  {item.desc}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default HeroSection;
