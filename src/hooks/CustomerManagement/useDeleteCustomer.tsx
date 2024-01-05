import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteCustomer = async (id: string) => {
  const { error } = await supabase.from("customer").delete().eq("id", id);

  if (error) {
    throw error;
  }
};

export default function useDeleteCustomer(id: any) {
  return useMutation(() => deleteCustomer(id));
}
