import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetBookingForBill = async () => {
  const { data: datanone, error: errornone } = await supabase
    .from("booking")
    .select(
      `*,
   cus_id ( * ),
 tour_id ( * )
  `
    )
    .eq("status", "none");

  if (errornone) {
    throw new Error(errornone.message);
  }

  if (!datanone) {
    throw new Error("not found");
  }

  const { data: datadone, error: errordone } = await supabase
    .from("booking")
    .select(
      `*,
 cus_id ( * ),
tour_id ( * )
`
    )
    .eq("status", "done");

  if (errordone) {
    throw new Error(errordone.message);
  }

  if (!datadone) {
    throw new Error("not found");
  }

  return { datanone, datadone };
};
export default function useGetBookingForBill() {
  return useQuery("getbookinglist", () => GetBookingForBill());
}
