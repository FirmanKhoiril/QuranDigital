import { useQuery } from "react-query";
import { Hero } from "../layout";
import { Loading, Error, QuranCard, QuranSearch } from "../components";
import { Box, Typography, Pagination } from "@mui/material";
import { fetchEQuran } from "../api/FetchEQuran";
import { Surah } from "../types/quran";
import { useState, useEffect } from "react";

const Home = () => {
  const [filtered, setFiltered] = useState<Surah[]>([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;


  const {
    data: surah,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useQuery<{ data: Surah[] }>(["surah"], fetchEQuran, {
    refetchOnWindowFocus: false,
    staleTime: 60 * (10 * 60),
    refetchInterval: 60 * (10 * 60),
  });

  useEffect(() => {
    if (surah?.data) {
      setFiltered(surah.data);
    }
  }, [surah]);


  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentSurahs = filtered.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  return (
    <>
      <Hero />
      <QuranSearch
        allSurahs={surah?.data || []}
        onFilter={setFiltered}
        setQuery={setQuery}
        query={query}
      />

      {isError && <Error />}
      {isFetching || isLoading ? (
        <Loading />
      ) : (
        isSuccess && (
          <Box
            sx={{
              my: 6,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            {query.length === 0 && (
              <Typography variant="h4" className="text-white font-semibold">
                <span className="font-quicksand font-semibold">
                  114 Surat Al-Quran
                </span>
              </Typography>
            )}

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  sm: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                },
                gap: 3,
                width: "100%",
                maxWidth: 1500,
              }}
            >
              {currentSurahs.map((surat) => (
                <QuranCard key={surat.nomor} {...surat} />
              ))}
            </Box>

            {filtered.length > itemsPerPage && (
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                sx={{
                  mt: 4,
                  "& .MuiPaginationItem-root": {
                    color: "#fff",
                    borderColor: "#555",
                  },
                  "& .MuiPagination-ul": {
                    gap: "6px",
                  },
                  "& .Mui-selected": {
                    backgroundColor: "#ee913d !important",
                    color: "#000 !important",
                  },
                }}
              />
            )}
          </Box>
        )
      )}
    </>
  );
};

export default Home;
