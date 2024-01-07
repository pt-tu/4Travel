import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteBooking = async (cus_id: string, tour_id: string) => {
  const { error } = await supabase
    .from("booking")
    .delete()
    .eq("cus_id", cus_id)
    .eq("tour_id", tour_id);

  if (error) {
    throw error;
  }
};

export default function useDeleteBooking(cus_id: any, tour_id: any) {
  return useMutation(() => deleteBooking(cus_id, tour_id));
}
