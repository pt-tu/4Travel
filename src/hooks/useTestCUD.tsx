import { useMutation, useQueryClient } from "react-query";
import supabase from "../app/supabase";
import { v4 as uuidv4 } from "uuid";

const test = async () => {
  const id = uuidv4();

  const { data, error: InsertError } = await supabase.from("tour").upsert({
    id: id,
    name: "a",
  });

  if (InsertError) {
    throw InsertError;
  }

  return data;
};

export default function useTestCUD() {
  return useMutation(() => test());
}
