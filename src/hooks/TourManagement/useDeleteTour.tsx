import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteTour = async (id: string) => {
  const { error } = await supabase.from("tour").delete().eq("id", id);

  if (error) {
    throw error;
  } else {
    const { error: ierror } = await supabase.storage
      .from("anhbia")
      .remove(["public/" + id + ".jpg"]);
    if (ierror) {
      throw error;
    }
  }
};

export default function useDeleteTour(id: string) {
  return useMutation(() => deleteTour(id));
}
