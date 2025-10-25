import axios from "axios";


const BASE_URL: string = "https://equran.id/api/v2";


export const fetchEQuran = async (): Promise<any> => {
  const { data } = await axios.get(`${BASE_URL}/surat`);

  return data;
};
