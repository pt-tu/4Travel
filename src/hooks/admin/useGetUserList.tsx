import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTopRevenue = async (name: string) => {
  const { data, error } = await supabase.rpc("getuser");
  //.ilike(`raw_user_meta_data->>ten`,``); //tai dat bien ben query la name, luoi doi,`&&`); //tai dat bien ben query la name, luoi doi
  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export default function useGetUserList(name: string) {
  return useQuery("userlist", () => GetTopRevenue(name));
}
