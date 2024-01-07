import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetBookingList = async () => {
  const { data: dataall, error: errorall } = await supabase
    .from("booking")
    .select("*");

  if (errorall) {
    throw new Error(errorall.message);
  }

  if (!dataall) {
    throw new Error("not found");
  }
  //danh sách tất cả booking

  //danh sách tất cả booking chưa thanh toán
  const { data: datanull, error: errornull } = await supabase
    .from("booking")
    .select("*");

  if (errornull) {
    throw new Error(errornull.message);
  }

  if (!dataall) {
    throw new Error("not found");
  }

  //danh sách tất cả booking đã thanh toán

  const { data: datadone, error: errordone } = await supabase
    .from("booking")
    .select("*");

  if (errordone) {
    throw new Error(errordone.message);
  }

  if (!dataall) {
    throw new Error("not found");
  }

  return { dataall, datadone, datanull };
};
export default function useGetBookingList() {
  return useQuery("getbookinglist", () => GetBookingList());
}
