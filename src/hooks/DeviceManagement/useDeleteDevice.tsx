import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteDevice = async (id: string) => {
  const { error } = await supabase.from("device").delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export default function useDeleteDevice(id: string) {
  return useMutation(() => deleteDevice(id));
}
