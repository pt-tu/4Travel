import { useQuery } from "react-query";
import supabase from "../app/supabase";

const GetBookingForBill = async () => {
  const { data, error: error } = await supabase.from("booking").select(`*,
   cus_id ( * ),
 tour_id ( * )
  `);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("not found");
  }

  return { data };
};
export default function useGetBookingForBill() {
  return useQuery("getbookinglist", () => GetBookingForBill());
}
