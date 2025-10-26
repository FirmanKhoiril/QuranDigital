import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { fetchDetailEQuran } from "../api/FetchEQuran";
import { SurahDetailData, TTafsirParams } from "../types/quran";
import {
  Box,
  Typography,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Loading, Error, Tafsir } from "../components";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import {
  BookOpen,
  BookType,
  Copy,
  Languages,
  MapPin,
  Pause,
  Play,
  Share2,
} from "lucide-react";
import { qaris } from "../utils/DummyData";
import { useGlobalContext } from "../utils/ContextAPI";

export default function QuranDetails() {
  const { id } = useParams<{ id: string }>();
  const { setShowTafsir, setTafsirAyat, setParamAyatSurat } =
    useGlobalContext();
  const [showTransliteration, setShowTransliteration] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [selectedAyat, setSelectedAyat] = useState("Semua");
  const [selectedQari, setSelectedQari] = useState(qaris[0]);
  const [playingAyat, setPlayingAyat] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setPlayingAyat(null);
  }, [selectedQari]);

  const handlePlayPause = (ayatNumber: number, audioUrl: string) => {
    if (!audioUrl) return;

    if (playingAyat === ayatNumber) {
      audioRef.current?.pause();
      setPlayingAyat(null);
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    setPlayingAyat(ayatNumber);
    audio.play();

    audio.onended = () => setPlayingAyat(null);
  };

  const {
    data: surah,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useQuery<{ data: SurahDetailData }>(
    ["surah", id],
    () => fetchDetailEQuran(id as string),
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      refetchInterval: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  if (isLoading || isFetching) return <Loading />;
  if (isError) return <Error />;

  const detail = surah?.data;
  const filteredAyat =
    selectedAyat === "Semua"
      ? detail?.ayat
      : detail?.ayat.filter(
          (a) => a.nomorAyat === parseInt(selectedAyat.replace("Ayat ", ""))
        );

  const handleCopy = (teksArab: string, teksIndonesia: string) => {
    navigator.clipboard.writeText(`${teksArab}\n\n${teksIndonesia}`);
  };

  const handleShare = (nomorAyat: number) => {
    const url = `${window.location.href}#ayat-${nomorAyat}`;
    navigator.share
      ? navigator.share({ title: `Ayat ${nomorAyat}`, url })
      : navigator.clipboard.writeText(url);
  };

  const handleTafsir = ({ ayat, arab }: TTafsirParams) => {
    setShowTafsir((prev) => !prev);
    setTafsirAyat(ayat);
    setParamAyatSurat(arab);
  };

  return (
    <Box
      sx={{
        bgcolor: "#0d0d0d",
        color: "white",
        minHeight: "100vh",
        p: 3,
        fontFamily: "'Quicksand', sans-serif",
      }}
    >
      <Tafsir />
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#ee913d" }}>
          <Button
            startIcon={<IoArrowBack />}
            sx={{
              color: "white",
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Kembali ke Beranda
          </Button>
        </Link>
        {detail?.nomor && detail.nomor < 114 && (
          <Link
            to={`/surah/${detail.nomor + 1}`}
            style={{ textDecoration: "none", color: "#ee913d" }}
          >
            <Button
              startIcon={<IoArrowForward />}
              sx={{
                color: "#ee913d",
                textTransform: "none",
                fontWeight: 500,
              }}
            >
              Surah Selanjutnya
            </Button>
          </Link>
        )}
      </Box>
      {isSuccess && detail && (
        <Box
          sx={{
            bgcolor: "rgba(10, 10, 10, 0.2)",
            borderRadius: 3,
            p: 4,
            mb: 4,
            boxShadow: "0 0 15px rgba(238,145,61,0.1)",
            borderLeft: "8px solid rgba(238,145,61,0.7)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
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
                  {detail.nomor}
                </Box>
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "#ee913d",
                      fontWeight: "bold",
                      mb: 1,
                    }}
                  >
                    {detail.namaLatin}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#aaa" }}>
                    {detail.arti}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
                    label={detail.tempatTurun}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.10)",
                      color: "#ccc",
                    }}
                  />
                  <Chip
                    icon={<BookOpen size={14} color="white" />}
                    label={`${detail.jumlahAyat} Ayat`}
                    size="small"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.08)",
                      color: "#ccc",
                    }}
                  />
                </Box>
                <Button
                  variant="outlined"
                  startIcon={<Play size={18} />}
                  sx={{
                    color: "#ee913d",
                    borderColor: "#ee913d",
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": {
                      borderColor: "#f0a44b",
                      backgroundColor: "transparent",
                      boxShadow: "0 0 10px rgba(238,145,61,0.3)",
                    },
                  }}
                  onClick={() =>
                    new Audio(detail.audioFull[selectedQari.key]).play()
                  }
                >
                  Putar Full Audio
                </Button>
              </Box>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontFamily: "Scheherazade New, serif",
                color: "#ee913d",
                textAlign: "right",
              }}
            >
              {detail.nama}
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#ccc",
              mt: 3,
              fontSize: 15,
              lineHeight: 1.8,
              textAlign: "justify",
            }}
            dangerouslySetInnerHTML={{ __html: detail.deskripsi }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Select
            size="small"
            value={selectedAyat}
            onChange={(e) => setSelectedAyat(e.target.value)}
            sx={{
              color: "white",
              minWidth: 120,
              bgcolor: "#1a1a1a",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#444",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ee913d",
              },
              "& .MuiSvgIcon-root": {
                color: "#fff",
              },
              "& .MuiSelect-select": {
                padding: "6px 32px 6px 10px",
              },
            }}
          >
            <MenuItem value="Semua">Semua</MenuItem>
            {detail?.ayat.map((a) => (
              <MenuItem key={a.nomorAyat} value={`Ayat ${a.nomorAyat}`}>
                Ayat {a.nomorAyat}
              </MenuItem>
            ))}
          </Select>

          <Select
            size="small"
            value={selectedQari.name}
            onChange={(e) => {
              const qari = qaris.find((q) => q.name === e.target.value);
              if (qari) setSelectedQari(qari);
            }}
            sx={{
              color: "white",
              minWidth: 200,
              bgcolor: "#1a1a1a",
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": { borderColor: "#444" },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#888",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#ee913d",
              },
              "& .MuiSvgIcon-root": { color: "#fff" },
              "& .MuiSelect-select": { padding: "6px 32px 6px 10px" },
            }}
          >
            {qaris.map((q) => (
              <MenuItem key={q.key} value={q.name}>
                {q.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Languages size={18} color="#ee913d" />
            <FormControlLabel
              control={
                <Switch
                  checked={showTransliteration}
                  onChange={() => setShowTransliteration((v: boolean) => !v)}
                  color="warning"
                />
              }
              label={
                <Typography sx={{ color: "#ddd", fontSize: 14 }}>
                  Transliterasi
                </Typography>
              }
            />
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <BookType size={18} color="#ee913d" />
            <FormControlLabel
              control={
                <Switch
                  checked={showTranslation}
                  onChange={() => setShowTranslation((v: boolean) => !v)}
                  color="warning"
                />
              }
              label={
                <Typography sx={{ color: "#ddd", fontSize: 14 }}>
                  Terjemahan
                </Typography>
              }
            />
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ mb: 3 }}>
          Ayat-ayat
        </Typography>

        {filteredAyat?.map((a: any) => (
          <Box
            key={a.nomorAyat}
            sx={{
              bgcolor: "rgba(10, 10, 10, 0.2)",
              borderRadius: 3,
              p: 3,
              mb: 3,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              boxShadow: "0 0 10px rgba(238,145,61,0.08)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "#ee913d",
                  fontWeight: 600,
                  border: "2px solid #ee913d",
                  borderRadius: "50%",
                  width: 50,
                  height: 50,
                  padding: 0.7,
                  textAlign: "center",
                  lineHeight: "35px",
                }}
              >
                {a.nomorAyat}
              </Typography>

              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <IconButton
                  onClick={() =>
                    handlePlayPause(a.nomorAyat, a.audio[selectedQari.key])
                  }
                  sx={{
                    width: 40,
                    height: 40,
                    border: "1px solid #ee913d",
                    borderRadius: "50%",
                    color: "#ee913d",
                    "&:hover": {
                      boxShadow: "0 0 10px rgba(238,145,61,0.3)",
                      borderColor: "#f0a44b",
                    },
                  }}
                >
                  {playingAyat === a.nomorAyat ? (
                    <Pause size={18} />
                  ) : (
                    <Play size={18} />
                  )}
                </IconButton>

                <Tooltip title="Tafsir">
                  <IconButton
                    onClick={() =>
                      handleTafsir({
                        ayat: a.nomorAyat,
                        arab: a.teksArab,
                      })
                    }
                    sx={{ color: "#ccc" }}
                  >
                    <BookOpen size={18} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Salin Ayat">
                  <IconButton
                    onClick={() => handleCopy(a.teksArab, a.teksIndonesia)}
                    sx={{ color: "#ccc" }}
                  >
                    <Copy size={18} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Bagikan">
                  <IconButton
                    onClick={() => handleShare(a.nomorAyat)}
                    sx={{ color: "#ccc" }}
                  >
                    <Share2 size={18} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            <Box sx={{ textAlign: "right", flex: 1, mx: 2 }}>
              <Typography
                sx={{
                  fontSize: 28,
                  fontFamily: "Scheherazade New, serif",
                }}
              >
                {a.teksArab}
              </Typography>
            </Box>
            {showTransliteration && (
              <Typography
                sx={{ fontStyle: "italic", color: "#bbb", fontSize: 15 }}
              >
                {a.teksLatin}
              </Typography>
            )}

            {showTranslation && (
              <Typography sx={{ color: "#ddd", fontSize: 16 }}>
                {a.teksIndonesia}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
