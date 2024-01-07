import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetBillList = async (bid: any) => {
  let { data: customer, error } = await supabase
    .from("bill")
    .select("*")
    .eq("id", bid);
  if (error) {
    throw new Error(error.message);
  }
  if (!customer) {
    throw new Error("Customer list not found");
  }
  return customer[0];
};

export default function useGetBillByBID(bid: any) {
  return useQuery("bill" + bid, () => GetBillList(bid));
}
