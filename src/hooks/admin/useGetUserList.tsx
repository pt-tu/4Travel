import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTopRevenue = async () => {
  const { data, error } = await supabase.rpc("getuser"); //tai dat bien ben query la name, luoi doi
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useGetUserList() {
  return useQuery("userlist", () => GetTopRevenue());
}
