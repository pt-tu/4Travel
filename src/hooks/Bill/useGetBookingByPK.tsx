import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetBookingByPK = async (cid: string, tid: string) => {
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
  //danh sách tất cả booking

  return data[0];
};
export default function useGetBookingByPK(cid: string, tid: string) {
  return useQuery("customer" + cid, () => GetBookingByPK(cid, tid));
}
