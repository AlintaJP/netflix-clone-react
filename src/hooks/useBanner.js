import instance from "../utils/api/axios";
import requests from "../utils/api/requests";
import { useQuery } from "@tanstack/react-query";

const useBanner = () => {
  const fetchBanner = async () => {
    const { data } = await instance.get(requests.fetchNetflixOriginals);
    const filteredData =
      data.results[Math.floor(Math.random() * data.results.length - 1)];
    return filteredData;
  };

  return useQuery(["banner"], fetchBanner, { staleTime: 60000 });
};

export default useBanner;
