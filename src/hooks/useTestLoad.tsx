import { useQuery } from "react-query";
import supabase from "../app/supabase";

const Getload = async () => {
  const { data, error } = await supabase.from("tour").select("*");

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("not found");
  }

  return data;
};
export default function useTestLoad() {
  return useQuery("load", () => Getload());
}
