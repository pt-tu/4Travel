import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetCustomerByCID = async (cid: string) => {
  const { data, error } = await supabase
    .from("customer")
    .select("*")
    .eq("id", cid);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("not found");
  }
  //danh sách tất cả booking

  return data[0];
};
export default function useGetCustomerByCID(cid: string) {
  return useQuery("customer" + cid, () => GetCustomerByCID(cid));
}
