import { useMutation, useQueryClient } from "react-query";
import supabase from "../app/supabase";

const testdelete = async (tourId: string[]) => {
  // Comment chapter later
  const { error: chapterError } = await supabase
    .from("tour")
    .delete()
    .eq("id", tourId);
};

export default function useTestDelete(id: any) {
  return useMutation(() => testdelete(id));
}
