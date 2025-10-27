import { useGlobalContext } from "../utils/ContextAPI";
import { fetchTafsirSurah } from "../api/FetchEQuran";
import Loading from "./Loading";
import Error from "./Error";
import { useQuery } from "react-query";
import { SurahTafsirDetailData } from "../types/quran";
import { IoBookOutline } from "react-icons/io5";

const Tafsir = () => {
  const {
    showTafsir,
    tafsirAyat,
    paramAyatSurat,
    setShowTafsir,
    setTafsirAyat,
    setParamAyatSurat,
  } = useGlobalContext();

  const shouldFetch = showTafsir && tafsirAyat > 0 && paramAyatSurat !== "";

  const {
    data: surah,
    isError,
    isFetching,
    isLoading,
  } = useQuery<{ data: SurahTafsirDetailData }>(
    ["tafsir", tafsirAyat],
    () => fetchTafsirSurah(tafsirAyat),
    {
      enabled: shouldFetch,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      refetchOnMount: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    }
  );

  if (!shouldFetch) return null;

  const tafsir = surah?.data?.tafsir?.find((t) => t.ayat === tafsirAyat);
  if (!tafsir) return null;

  const closeTafsirModal = () => {
    setShowTafsir(false);
    setTafsirAyat(0);
    setParamAyatSurat("");
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/60 backdrop-blur-sm"
      onClick={closeTafsirModal}
    >
      {isLoading || isFetching && <Loading /> }
      {isError && <Error />}
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0c0c0c] rounded-2xl max-w-3xl w-full p-6 text-white overflow-y-auto max-h-[90vh] relative shadow-lg border border-zinc-800"
      >

        <button
          onClick={closeTafsirModal}
          className="absolute top-3 right-4 text-gray-400 hover:text-white text-lg"
        >
          ✕
        </button>

        <div className="pb-6 flex flex-row gap-4 items-center border-gray-200/20 border-b">
          <div className="p-3 bg-[#ee913d] rounded-full">
            <IoBookOutline color="white" size={24} />
          </div>
          <div className="text-start flex flex-col gap-2">
            <h2 className="text-xl font-semibold text-primary-0">
              Tafsir {surah?.data?.namaLatin} Ayat {tafsirAyat}
            </h2>
            <div className="flex items-center gap-2">
              <p className="text-gray-300 text-xs py-1 px-2 rounded-full bg-slate-100/10">
                {surah?.data?.namaLatin}
              </p>
              <p className="text-gray-400 text-xs py-1 px-2 rounded-full bg-[#0c0c0c]/20 border-slate-100/10 border">
                ayat {surah?.data?.nomor}
              </p>
            </div>
          </div>
        </div>


        <div className="bg-zinc-900 px-4 py-8 text-end text-2xl font-arabic mt-4 rounded-lg">
          {paramAyatSurat}
        </div>

        <p className="mt-4 pb-4 text-sm max-h-[400px] px-2 h-full overflow-y-auto leading-relaxed border-gray-200/20 border-b text-gray-300 whitespace-pre-line">
          {tafsir?.teks}
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeTafsirModal}
            className="border border-gray-200/20 text-white px-6 py-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tafsir;
