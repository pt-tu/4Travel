import { useMutation, useQueryClient } from "react-query";
import supabase from "../../app/supabase";

{
  /*tim cach set admin role*/
}
const reset = async (newPass: string) => {
  const { error } = await supabase.auth.updateUser({ password: newPass });

  if (error) {
    throw error;
  }
};

export default function useResetPassword(newPass: string) {
  return useMutation(() => reset(newPass));
}
