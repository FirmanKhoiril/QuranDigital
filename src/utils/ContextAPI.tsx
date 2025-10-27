import { useState, createContext, useContext, useEffect } from "react";
import {  ThemeProvider, CssBaseline } from "@mui/material";
import { TContextProps } from "../types/Types";
import { theme } from "./theme";

const StateContext = createContext<TContextProps>({
  toogle: false,
  verse: {},
  searchTerm: "",
  indexSurat: 1,
  verseDetail: {},
  showTafsir: false,
  tafsirAyat: 0,
  paramAyatSurat: "",
  mode: "dark",
  setMode: () => {},
  setShowTafsir: () => {},
  setTafsirAyat: () => {},
  setVerseDetail: () => {},
  setVerse: () => {},
  setToogle: () => {},
  setIndexSurat: () => {},
  setSearchTerm: () => {},
  setParamAyatSurat: () => {},
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [toogle, setToogle] = useState<boolean>(false);
  const [verse, setVerse] = useState<object>({});
  const [verseDetail, setVerseDetail] = useState<object>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [indexSurat, setIndexSurat] = useState<number>(1);
  const [showTafsir, setShowTafsir] = useState(false);
  const [tafsirAyat, setTafsirAyat] = useState(0);
  const [paramAyatSurat, setParamAyatSurat] = useState("");
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") || "dark"
  );
  useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", mode);
  }, [mode]);

  return (
    <StateContext.Provider
      value={{
        toogle,
        verse,
        verseDetail,
        searchTerm,
        indexSurat,
        showTafsir,
        tafsirAyat,
        paramAyatSurat,
        mode,
        setMode,
        setShowTafsir,
        setTafsirAyat,
        setVerseDetail,
        setVerse,
        setToogle,
        setIndexSurat,
        setSearchTerm,
        setParamAyatSurat,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StateContext.Provider>
  );
};

export const useGlobalContext = (): TContextProps => useContext(StateContext);
