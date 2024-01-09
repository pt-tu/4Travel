import { useMutation } from "react-query";
import supabase from "../../app/supabase";
const updateRole = async (uid: any, role: any) => {
  const { data, error } = await supabase.rpc("changerolle", {
    newrole: role,
    user_idd: uid,
  }); //tai dat bien ben query la name, luoi doi
  if (error) {
    throw new Error(error.message);
  }
  if (error) {
    throw error;
  }

  console.log(data);
};

export default function useUpdateRoleByUID(uid: any, role: any) {
  return useMutation(() => updateRole(uid, role));
}
