import { useQuery } from "react-query";
import supabase from "../../app/supabase";

const getUser = async (userId: string) => {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("User not found");
  }

  return data.user;
};

const GetCurrentUser = async () => {
  const { data, error } = await supabase.auth.getSession();
  if (error) {
    throw new Error(error.message);
  }
  const userId = data.session?.user.id;
  if (userId == null) {
    throw new Error("User not found");
  }
  const userData = await getUser(userId);
  console.log(userData);
  return userData;
};
export default function useUser() {
  return useQuery("user", () => GetCurrentUser());
}
