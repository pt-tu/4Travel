import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteTour = async (id: string) => {
  const { error } = await supabase.from("tour").delete().eq("id", id);
  const { error: ierror } = await supabase.storage
    .from("anhbia")
    .remove(["public/" + id + ".jpg"]);

  if (error) {
    throw error;
  }
  if (ierror) {
    throw error;
  }
};

export default function useDeleteTour(id: string) {
  return useMutation(() => deleteTour(id));
}
