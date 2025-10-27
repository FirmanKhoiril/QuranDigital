import { Surah } from "./quran";

export interface IIndexOfSurat {
  surat: {
    id: number;
    translation_eng: string;
    content: string;
    transliteration: string;
  };
}
export type TIndexOfSurat = {
  id: number;
  translation_eng: string;
  content: string;
  transliteration: string;
};

export type ISurat = {
  nomor: number;
  surat: string;
  arti: string;
  sejarah: string;
};

export type TVerses = {
  name: string;
  value: Object | any;
};

export type TContextProps = {
  toogle: boolean;
  verse: object;
  verseDetail: object;
  searchTerm: string;
  indexSurat: number;
  showTafsir: boolean;
  tafsirAyat: number;
  paramAyatSurat: string;
  mode: "light" | "dark";
  setMode: React.Dispatch<React.SetStateAction<"light" | "dark">>;
  setShowTafsir: (prev: boolean) => void;
  setTafsirAyat: (v: number) => void;
  setVerseDetail: (v: object) => void;
  setVerse: (v: object) => void;
  setToogle: (v: boolean) => void;
  setIndexSurat: (v: number) => void;
  setSearchTerm: (v: string) => void;
  setParamAyatSurat: (v: string) => void;
};


export interface IOptions {
  headers: {
    ["X-RapidAPI-Key"]: string;
    ["X-RapidAPI-Host"]: string;
  };
}

export type TSurah = {
  id: string;
  surah_name: string;
  surah_name_ar: string;
  translation: string;
  type: string;
  total_verses: number;
  description: string;
  verses: TIndexOfSurat;
};

export interface QuranSearchProps {
  allSurahs: Surah[];
  onFilter: (filtered: Surah[]) => void;
  query: string;
  setQuery: (query: string) => void;
}