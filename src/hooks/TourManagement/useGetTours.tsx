import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const GetTours = async () => {
  const { data, error } = await supabase.from("tour").select("*");

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Tour not found!");
  }
  //danh sách tất cả booking

  return data;
};
export default function useGetTours() {
  return useQuery("tour", () => GetTours());
}
