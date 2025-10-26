import axios from "axios";
import {  SurahDetailResponse, SurahListResponse, SurahTafsirDetailResponse } from "../types/quran";


const BASE_URL: string = "https://equran.id/api/v2";


export const fetchEQuran = async (): Promise<SurahListResponse> => {
  const { data } = await axios.get(`${BASE_URL}/surat`);

  return data;
};

export const fetchDetailEQuran = async (id: string): Promise<SurahDetailResponse> => {
  const { data } = await axios.get(`${BASE_URL}/surat/${id}`);

  return data;
};

export const fetchTafsirSurah = async (tafsirAyat: number): Promise<SurahTafsirDetailResponse> => {
  const { data } = await axios.get(`${BASE_URL}/tafsir/${tafsirAyat}`);

  return data;
};
