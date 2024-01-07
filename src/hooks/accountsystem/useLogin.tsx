import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};

export default function useLogin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  return useMutation(() => login({ email, password }));
}
