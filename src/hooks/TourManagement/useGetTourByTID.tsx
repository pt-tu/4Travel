import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTourByTID = async (tid: string) => {
  const { data, error } = await supabase.from("tour").select("*").eq("id", tid);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("not found");
  }
  //danh sách tất cả booking

  return data[0];
};
export default function useGetTourByTID(tid: string) {
  return useQuery("customer" + tid, () => GetTourByTID(tid));
}
