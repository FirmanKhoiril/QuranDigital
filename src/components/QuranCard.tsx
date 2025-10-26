import { Surah } from "../types/quran";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BookOpen, MapPin } from "lucide-react";

const QuranCard = ({
  nama,
  nomor,
  arti,
  jumlahAyat,
  namaLatin,
  tempatTurun,
}: Surah) => {
  return (
    <Card
      key={nomor}
      sx={{
        backgroundColor: "#111",
        border: "1px solid #333",
        borderRadius: "16px",
        padding: 1,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.3s",
        "&:hover": {
          borderColor: "#ee913d",
          transform: "translateY(-6px)",
        },
      }}
    >
      <Link to={`/surah/${nomor}`} className="w-full">
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                border: "2px solid #ee913d",
                borderRadius: "50%",
                width: 40,
                height: 40,
                minWidth: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#ee913d",
                fontWeight: "bold",
              }}
            >
              {nomor}
            </Box>
            <Box>
              <Typography variant="h6" className="text-white font-semibold">
                <span className="font-quicksand ">{namaLatin} </span>
                <span className="text-slate-400 font-quicksand text-sm font-normal">
                  ({arti})
                </span>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  mt: 0.5,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  icon={<MapPin size={14} color="white" />}
                  label={tempatTurun}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.10)",
                    color: "#ccc",
                  }}
                />
                <Chip
                  icon={<BookOpen size={14} color="white" />}
                  label={`${jumlahAyat} Ayat`}
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.08)",
                    color: "#ccc",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <Typography
            variant="h5"
            sx={{
              color: "#ee913d",
              fontFamily: "'Scheherazade New', serif",
              fontSize: "1.8rem",
            }}
          >
            <span className="font-arab">
              {nama}
            </span>
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
};

export default QuranCard;
