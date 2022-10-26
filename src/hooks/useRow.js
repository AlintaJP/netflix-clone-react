import { useQuery } from "@tanstack/react-query";
import instance from "../utils/api/axios";

const useRow = (fetchUrl) => {
  const fetchRow = async () => {
    const {
      data: { results },
    } = await instance.get(fetchUrl);
    return results;
  };

  return useQuery(["row", fetchUrl], fetchRow, { staleTime: 60000 });
};

export default useRow;
