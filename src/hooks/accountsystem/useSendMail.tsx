import { useMutation } from "react-query";
import supabase from "../../app/supabase";

const sendmail = async (mail: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(mail, {
    redirectTo: "http://localhost:3000/reset-password",
  });
  {
    /*phai save url vao pj supabase*/
  }

  if (error) {
    throw error;
  }
};

export default function useSendmail(mail: string) {
  return useMutation(() => sendmail(mail));
}
