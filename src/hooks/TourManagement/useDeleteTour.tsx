import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteTour = async (id: string) => {
  const { error } = await supabase.from("tour").delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export default function useDeleteTour(id: any) {
  return useMutation(() => deleteTour(id));
}
