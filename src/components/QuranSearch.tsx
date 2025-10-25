import { useMemo, useEffect, FC } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ClosedCaptionIcon, SearchIcon } from "lucide-react";
import { QuranSearchProps } from "../types/Types";

const QuranSearch: FC<QuranSearchProps> = ({ allSurahs, onFilter, query,  setQuery }) => {
  const filteredSurahs = useMemo(() => {
    const lower = query?.toLowerCase();
    return allSurahs.filter(
      (surat) =>
        surat.namaLatin.toLowerCase().includes(lower) ||
        surat.nama.toLowerCase().includes(lower) ||
        surat.arti.toLowerCase().includes(lower) ||
        surat.nomor.toString().includes(lower)
    );
  }, [allSurahs, query]);

  useEffect(() => {
    onFilter(filteredSurahs);
  }, [filteredSurahs, onFilter]);

  return (
    <Box sx={{ textAlign: "center", color: "white", mt: 6 }}>
      <Typography variant="h4" fontWeight={700}>
        <span className="font-quicksand">Cari Surat Al-Quran</span>
      </Typography>
      <Typography sx={{ color: "#aaa", mt: 1 }}>
        <span className="font-quicksand">
          Cari berdasarkan nama surat, nomor, atau arti
        </span>
      </Typography>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
        <TextField
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari surat..."
          sx={{
            width: "400px",
            backgroundColor: "#111",
            borderRadius: "12px",
            input: { color: "white" },
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "#333" },
            "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#555" },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="#888" />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setQuery("")}
                  sx={{ color: "#888" }}
                >
                  <ClosedCaptionIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {query.length !== 0 && (
        <Typography sx={{ mt: 2, color: "#aaa" }}>
        <span className="font-quicksand">
          Menampilkan {filteredSurahs.length} dari {allSurahs.length} surat
        </span>
      </Typography>
      )}
    </Box>
  );
};

export default QuranSearch;
