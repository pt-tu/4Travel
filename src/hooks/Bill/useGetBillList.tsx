import { useMutation, useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetBillList = async () => {
  let { data: customer, error } = await supabase
    .from("bill")
    .select("*")
    .order("time", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }
  if (!customer) {
    throw new Error("Customer list not found");
  }
  return customer;
};

export default function useGetBillList() {
  return useQuery("billList", () => GetBillList());
}
