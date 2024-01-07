import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTourPage = async (page: number) => {
    const { data, error } = await supabase
    .from("tour")
    .select("*")
    .range((page - 1) * 5, page * 5 - 1)
    .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
  
    if (!data) {
      throw new Error("Tour not found!");
    }
    //danh sách tất cả booking
  
    return data;
  };
  export default function useGetTourPage(page: number) {
    return useQuery("TourPage" + page, () => GetTourPage(page));
  }