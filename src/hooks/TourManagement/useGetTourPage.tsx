import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTourPage = async (page: number, diemdi: string, diemden: string, ngaydi: string, ngayve: string, TourName: string) => {
  const { data, error } = await supabase
    .from("tour")
    .select("*")
    .range((page - 1) * 5, page * 5 - 1)
    .order("created_at", { ascending: false })
    .ilike("diemdi", `%${diemdi}%`)
    .ilike("diemden", `%${diemden}%`)
    .gte("start", `%${ngaydi}%`)
    .lte("end", `%${ngayve}%`)
    .ilike("name", `%${TourName}%`);

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Tour not found!");
  }
  //danh sách tất cả booking

  return data;
};
export default function useGetTourPage(page: number, diemdi: string, diemden: string, ngaydi: string, ngayve: string, TourName: string) {
  return useQuery("TourPage" + page, () => GetTourPage(page, diemdi, diemden, ngaydi, ngayve, TourName));
}