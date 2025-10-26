export interface AudioFull {
  [key: string]: string;
}


export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: "Mekah" | "Madinah";
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
  tafsir?: Tafsir[];
}

export type TSurah = {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: "Mekah" | "Madinah";
  arti: string;
  deskripsi: string;
  audioFull: AudioFull;
  tafsir?: Tafsir[];
};

export interface Tafsir {
  ayat: number;
  teks: string;
}


export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: AudioFull;
}

export interface SurahListResponse {
  code: number;
  message: string;
  data: Surah[];
}

export interface SurahDetailResponse {
  code: number;
  message: string;
  data: SurahDetailData;
}
export interface SurahTafsirDetailResponse {
  code: number;
  message: string;
  data: SurahTafsirDetailData;
}

export interface SurahDetailData extends Omit<Surah, "audioFull"> {
  ayat: Ayat[];
  audioFull: AudioFull;
}

export interface SurahTafsirDetailData extends Omit<Surah, "audioFull"> {
  ayat: Ayat[];
  audioFull: AudioFull;
  tafsir?: Tafsir[];
}

export type TTafsirParams = {
  ayat: number;
  arab: string;
}