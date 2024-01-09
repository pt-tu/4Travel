import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetHanhKhach = async (cid: string, tid: string) => {
  const { data, error } = await supabase
    .from("booking")
    .select("*")
    .eq("cus_id", cid)
    .eq("tour_id", tid);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("not found");
  }

  return data[0].hanhkhach;
};
export default function useGetHanhKhach(cid: string, tid: string) {
  return useQuery("customer" + tid, () => GetHanhKhach(cid, tid));
}
