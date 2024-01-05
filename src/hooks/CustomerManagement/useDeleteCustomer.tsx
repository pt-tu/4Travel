import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const deleteCustomer = async (id: string[]) => {
  for (const customerId of id) {
    try {
      const { error: customerError } = await supabase
        .from("customer")
        .delete()
        .eq("id", customerId);

      if (customerError) {
        throw customerError;
      }
    } catch (error) {
      console.error("Error deleting:", error);
    }
  }
};

export default function useDeleteCustomer(id: any) {
  return useMutation(() => deleteCustomer(id));
}
