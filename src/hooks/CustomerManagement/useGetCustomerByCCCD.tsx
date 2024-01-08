import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetCustomerByCCCD = async (cccd: string) => {
  const { data, error } = await supabase
    .from("customer")
    .select("*")
    .eq("cccd", cccd);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("not found");
  }

  return data[0];
};

export default function useGetCustomerByCCCD(cccd: string) {
  return useQuery("customer" + cccd, () => GetCustomerByCCCD(cccd));
}
