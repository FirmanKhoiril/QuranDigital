import axios from "axios";
import {  SurahListResponse } from "../types/quran";


const BASE_URL: string = "https://equran.id/api/v2";


export const fetchEQuran = async (): Promise<SurahListResponse> => {
  const { data } = await axios.get(`${BASE_URL}/surat`);

  return data;
};
