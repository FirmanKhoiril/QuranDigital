import { useQuery } from "react-query";
import { Hero } from "../layout";
import { Loading, Error } from "../components";
import { Box, Typography } from "@mui/material";

import { fetchEQuran } from "../api/FetchEQuran";

const Home = () => {

  const { data: surah,  isError, isFetching, isLoading, isSuccess } = useQuery(["surah"], fetchEQuran, {
    refetchOnWindowFocus: false,
    staleTime: 60 * (10 * 60),
    refetchInterval: 60 * (10 * 60),
  });

  return (
    <>
      <Hero />

      {isError && <Error />}
      {isFetching && isLoading ? (
        <Loading />
      ) : (
        isSuccess && (
          <Box sx={{ my: 2, display: "flex", flexDirection: "column", gap: 1 }}>
            {surah.data.map((surat) => {
              console.log(surat)
              return (
                <div className="" key={1}>Test</div>
              )
            })}
          </Box>
        )
      )}
    </>
  );
};

export default Home;
